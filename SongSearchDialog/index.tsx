import * as React from 'react'
import { Dialog, DialogClose, DialogTitle } from '@components/Dialog'
import { CloseButton } from '@components/JoinRoomDialog/styles'
import { SpinnerSVG } from '@components/Spinner'
import { Status } from '@components/Spinner/store'
import { CloseIcon } from '@icons/Close'
import { PlayIcon } from '@icons/Play'
import { SearchIcon } from '@icons/Search'
import { useFormState } from 'hooks/useFormState'
import {
  DialogHeading,
  HiddenDialogLabel,
  StyledDialogContent,
  SearchButton,
  Form,
  SongsSection,
  SongHeading,
  LoadMoreButton,
  SongsList,
  SongItemWrapper,
  SongItemPlayButton,
  SongItemTitle,
  SongItemAuthor,
  Clock,
  Time,
  SearchInput,
} from './styles'

type Props = {
  dialogRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

export const SearchSongDialog = ({ dialogRef, children }: Props) => {
  const [status, setStatus] = React.useState<Status>('idle')

  const {
    formState: { song },
    handleChange,
  } = useFormState({ song: '' })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const loadMoreElementType = status === 'loading' ? 'div' : 'button'
  const loadMoreElementLabel =
    status === 'loading' ? 'Loading more songs' : 'Load More'
  const loadMoreElementRole = status === 'loading' ? 'alert' : 'button'

  return (
    <Dialog>
      <StyledDialogContent ref={dialogRef}>
        <DialogTitle asChild>
          <DialogHeading>Search</DialogHeading>
        </DialogTitle>
        <Form onSubmit={handleSubmit}>
          <HiddenDialogLabel htmlFor="song">Enter song title</HiddenDialogLabel>
          <SearchInput
            id="song"
            placeholder="Sadness and sorrow"
            onChange={(event) => handleChange(event)}
            name="song"
            value={song}
          />
          <SearchButton type="submit" aria-disabled={!song} aria-label="Search">
            <SearchIcon />
          </SearchButton>
        </Form>
        <SongsSection>
          <SongHeading>Songs</SongHeading>
          <SongsList>
            <SongItemWrapper>
              <SongItemPlayButton aria-label={`Play Konoha Peace by Kato`}>
                <PlayIcon />
              </SongItemPlayButton>
              <SongItemTitle aria-label={`Konoha Peace by Kato`}>
                Konoha Peace
              </SongItemTitle>
              <SongItemAuthor aria-hidden="true">Kato</SongItemAuthor>
              <Clock />
              <Time>2:14</Time>
            </SongItemWrapper>
          </SongsList>
        </SongsSection>
        <LoadMoreButton
          as={loadMoreElementType}
          aria-label={loadMoreElementLabel}
          role={loadMoreElementRole}
        >
          {status === 'loading' ? <SpinnerSVG /> : 'Load More'}
        </LoadMoreButton>
        <DialogClose asChild>
          <CloseButton aria-label="Close" css={{ heightWidth: 22 }}>
            <CloseIcon />
          </CloseButton>
        </DialogClose>
      </StyledDialogContent>
      {children}
    </Dialog>
  )
}
