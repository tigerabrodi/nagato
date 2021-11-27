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
    formState: { title, tasteOfMusic },
    handleChange,
  } = useFormState({ title: '', tasteOfMusic: '' })

  const isAnyFieldEmpty = !title || !tasteOfMusic

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
          <DialogLabel htmlFor="tasteOfMusic">Taste of music</DialogLabel>
          <TasteOfMusicTextarea
            id="tasteOfMusic"
            name="tasteOfMusic"
            value={tasteOfMusic}
            onChange={(event) => handleChange(event)}
            placeholder="Relaxing and sad anime songs."
          />
          <CreateButton type="submit" aria-disabled={isAnyFieldEmpty}>
            Create
          </CreateButton>
        </Form>
        <DialogClose asChild>
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </DialogClose>
      </StyledDialogContent>
      <DialogTriggerButton>
        Create
        <IconWrapper>
          <RoomParty />
        </IconWrapper>
      </DialogTriggerButton>
    </Dialog>
  )
}
