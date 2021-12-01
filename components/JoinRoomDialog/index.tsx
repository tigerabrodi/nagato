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
  const {
    formState: { roomId },
    handleChange,
  } = useFormState({ roomId: '' })

  const { setStatus } = useLoadingStore()

  const router = useRouter()

  const getRoomWithId = async () => {
    const { data: room } = await supabase
      .from<Room>('rooms')
      .select('id')
      .eq('id', roomId)
      .single()

    const doesRoomNotExist = room === null

    return { doesRoomNotExist }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!roomId) {
      toast.error('Please enter a room id.')
      return
    }

    const { doesRoomNotExist } = await getRoomWithId()

    if (doesRoomNotExist) {
      toast.error('Room does not exist.')
      return
    }
  }

  return (
    <Dialog>
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
