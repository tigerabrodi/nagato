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

type Props = {
  dialogRef: React.RefObject<HTMLDivElement>
}

export const CreateRoomDialog = ({ dialogRef }: Props) => {
  const {
    formState: { title, typeOfMusic },
    handleChange,
  } = useFormState({ title: '', typeOfMusic: '' })

  const isAnyFieldEmpty = !title || !typeOfMusic

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isAnyFieldEmpty) {
      return toast.error('Please fill out all fields.')
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
