import * as React from 'react'
import { CloseIcon } from '@icons/Close'
import {
  StyledDialogContent,
  DialogTriggerButton,
  DialogHeading,
  DialogLabel,
  Form,
  TitleInput,
  TasteOfMusicTextarea,
  CreateButton,
  RoomParty,
  CloseButton,
  IconWrapper,
} from './styles'
import { Dialog, DialogClose, DialogTitle } from '@components/Dialog'
import { useFormState } from 'hooks/useFormState'
import toast from 'react-hot-toast'
import { supabase } from '@lib/client'
import { Room } from '@lib/types'
import { useRouter } from 'next/router'

type Props = {
  dialogRef: React.RefObject<HTMLDivElement>
}

export const CreateRoomDialog = ({ dialogRef }: Props) => {
  const {
    formState: { title, typeOfMusic },
    handleChange,
  } = useFormState({ title: '', typeOfMusic: '' })

  const router = useRouter()
  const isAnyFieldEmpty = !title || !typeOfMusic
  const currentAuthUser = supabase.auth.user()

  const hasUserAlreadyCreatedARoom = async () => {
    const { data: room } = await supabase
      .from<Room>('rooms')
      .select('id')
      .eq('owner', currentAuthUser!.id)
      .single()

    return Boolean(room)
  }

  const createRoom = async () => {
    const { data: room } = await supabase
      .from<Room>('rooms')
      .insert({
        title,
        typeOfMusic,
        owner: currentAuthUser!.id,
      } as Room)
      .single()

    return room
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isAnyFieldEmpty) {
      return toast.error('Please fill out all fields.')
    }

    const hasCreatedARoom = await hasUserAlreadyCreatedARoom()

    if (hasCreatedARoom) {
      return toast.error('You can only create one room at a time!')
    }

    const room = await createRoom()

    if (room) {
      toast.success(
        `Room ${title} have successfully been created! ID of room has been copied to clipboard!`
      )
      router.push(`/rooms/${room.id}`)
    }
  }

  return (
    <Dialog>
      <StyledDialogContent ref={dialogRef}>
        <DialogTitle asChild>
          <DialogHeading>Create Room</DialogHeading>
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <DialogLabel htmlFor="title">Title</DialogLabel>
          <TitleInput
            id="title"
            placeholder="Anime Vibes"
            onChange={(event) => handleChange(event)}
            name="title"
            value={title}
          />
          <DialogLabel htmlFor="typeOfMusic">Type of music</DialogLabel>
          <TasteOfMusicTextarea
            id="typeOfMusic"
            name="typeOfMusic"
            value={typeOfMusic}
            onChange={(event) => handleChange(event)}
            placeholder="Relaxing and sad anime songs."
          />
          <CreateButton type="submit" aria-disabled={isAnyFieldEmpty}>
            Create
          </CreateButton>
        </Form>
        <DialogClose asChild>
          <CloseButton aria-label="Close">
            <CloseIcon />
          </CloseButton>
        </DialogClose>
      </StyledDialogContent>
      <DialogTriggerButton aria-label="Create Room">
        Create
        <IconWrapper>
          <RoomParty />
        </IconWrapper>
      </DialogTriggerButton>
    </Dialog>
  )
}
