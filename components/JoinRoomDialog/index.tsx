import * as React from 'react'
import { CloseIcon } from '@icons/Close'
import {
  StyledDialogContent,
  DialogHeading,
  DialogLabel,
  Form,
  RoomIDInput,
  JoinButton,
  CloseButton,
} from './styles'
import { Dialog, DialogClose, DialogTitle } from '@components/Dialog'
import { useFormState } from 'hooks/useFormState'
import { useRouter } from 'next/router'
import { useLoadingStore } from '@components/Spinner/store'
import {
  ButtonText,
  Dance,
  JoinRoomButton,
} from '@components/Navigation/styles'
import toast from 'react-hot-toast'
import { supabase } from '@lib/client'
import { Room } from '@lib/types'

type Props = {
  dialogRef: React.RefObject<HTMLDivElement>
}

export const JoinRoomDialog = ({ dialogRef }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const {
    formState: { roomId },
    handleChange,
  } = useFormState({ roomId: '' })

  const { setStatus } = useLoadingStore()

  const router = useRouter()

  const getRoomWithId = async () => {
    const { data: room } = await supabase
      .from<Room>('rooms')
      .select('id, title')
      .eq('id', roomId)
      .single()

    const doesRoomNotExist = room === null

    return { doesRoomNotExist, room }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    if (!roomId) {
      toast.error('Please enter a room id.')
      setStatus('error')
      return
    }

    const { doesRoomNotExist, room } = await getRoomWithId()

    if (doesRoomNotExist) {
      toast.error('Room does not exist.')
      setStatus('error')
      return
    }

    setStatus('success')
    setIsOpen(false)
    toast.success(`You successfully joined the room ${room!.title}!`)
    router.push(`/rooms/${roomId}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <StyledDialogContent ref={dialogRef}>
        <DialogTitle asChild>
          <DialogHeading>Join Room</DialogHeading>
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogLabel htmlFor="roomId">Room ID</DialogLabel>
          <RoomIDInput
            id="roomId"
            placeholder="123"
            onChange={(event) => handleChange(event)}
            name="roomId"
            value={roomId}
          />
          <JoinButton type="submit" aria-disabled={!roomId}>
            Join
          </JoinButton>
        </Form>
        <DialogClose asChild>
          <CloseButton aria-label="Close">
            <CloseIcon />
          </CloseButton>
        </DialogClose>
      </StyledDialogContent>
      <JoinRoomButton>
        <ButtonText>Join Room</ButtonText>
        <Dance />
      </JoinRoomButton>
    </Dialog>
  )
}
