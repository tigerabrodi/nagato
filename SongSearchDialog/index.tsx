import * as React from 'react'
import { Dialog, DialogClose, DialogTitle } from '@components/Dialog'
import { CloseButton } from '@components/JoinRoomDialog/styles'
import { CloseIcon } from '@icons/Close'
import { SpinnerSVG } from '@components/Spinner'
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
  FirstSearchSpinner,
} from './styles'

type Props = {
  dialogRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

type Status = 'idle' | 'firstLoading' | 'success' | 'error' | 'moreLoading'

export const SearchSongDialog = ({ dialogRef, children }: Props) => {
  const [status, setStatus] = React.useState<Status>('idle')

  const {
    formState: { song },
    handleChange,
  } = useFormState({ song: '' })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const loadMoreElementType = status === 'moreLoading' ? 'div' : 'button'
  const loadMoreElementLabel =
    status === 'moreLoading' ? 'Loading more songs' : 'Load More'
  const loadMoreElementRole = status === 'moreLoading' ? 'alert' : 'button'

  return (
    <Dialog>
      <StyledDialogContent ref={dialogRef}>
        {status === 'firstLoading' && (
          <FirstSearchSpinner ariaLabel="loading" />
        )}
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
          {status === 'moreLoading' ? <SpinnerSVG /> : 'Load More'}
        </LoadMoreButton>
        <DialogClose asChild>
          <CloseButton
            aria-label="Close"
            css={{ heightWidth: 22, '@tablet': { heightWidth: 33 } }}
          >
            <CloseIcon />
          </CloseButton>
        </DialogClose>
      </StyledDialogContent>
      {children}
    </Dialog>
  )
}
