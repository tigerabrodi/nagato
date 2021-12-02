import * as React from 'react'
import { useHasMounted } from 'hooks/useHasMounted'
import { styled } from 'stitches.config'
import { CreateRoomDialog } from '@components/CreateRoomDialog'
import { useRedirectOutUsers } from 'hooks/useRedirectOutUsers'
import { RoomPartyIcon } from '@icons/RoomParty'
import { MusicalNoteIcon } from '@icons/MusicalNote'
import { toRem } from '@lib/helpers'
import { keyframes } from '@stitches/react'

const upDownAnim = keyframes({
  '0%': {
    transform: 'translateY(2px)',
  },
  '100%': {
    transform: 'translateY(-2px)',
  },
})

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '@tablet': {
    width: '90%',
    marginX: 'auto',
    position: 'relative',
  },
})

const RoomsHeading = styled('h1', {
  marginTop: 20,
  fontSize: '$mobileHeading',
  fontWeight: 'bold',
  color: '$tertiary',
  '@tablet': {
    fontSize: '$desktopHeading',
  },
})

const RoomsList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: 30,
  rowGap: 20,
  '@tablet': {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    columnGap: 20,
    justifyContent: 'center',
    marginBottom: 16,
  },
})

const RoomListItem = styled('li', {
  minHeight: 220,
  width: 240,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '$shadowElevationLow',
  position: 'relative',
  border: '2px solid $secondary',
  borderTop: 'none',
  paddingBottom: 8,
  '&:last-of-type': {
    marginBottom: 16,
  },
  '@tablet': {
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  '@laptop': {
    minHeight: 320,
    width: 300,
  },
})

const RoomItemHeading = styled('h2', {
  color: '$secondary',
  fontWeight: '$semiBold',
  fontSize: toRem(30),
  marginTop: 10,
  textAlign: 'center',
  '@laptop': {
    fontSize: toRem(40),
  },
})

const RoomItemTypeMusicText = styled('p', {
  fontSize: toRem(15),
  fontWeight: '$medium',
  color: '$tertiary',
  marginTop: 5,
  textAlign: 'center',
  paddingX: 10,
  '@laptop': {
    fontSize: toRem(18),
    marginTop: 10,
  },
})

const RoomJoinLink = styled('a', {
  width: 84,
  height: 26,
  fontSize: toRem(16),
  fontWeight: '$semiBold',
  color: '$primary',
  marginTop: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$secondary',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.4)',
  '@laptop': {
    transition: 'all ease-out 0.2s',
    marginTop: 'auto',
    width: 100,
    height: 35,
    fontSize: toRem(22),
    '&:hover': {
      transform: 'scale(1.01) translateY(-2px)',
      boxShadow: '0 3px 2px rgba(0, 0, 0, 0.5)',
    },
  },
})

const RoomAuthorLink = styled('a', {
  color: '$tertiary',
  marginTop: 10,
  fontWeight: '$regular',
  fontSize: toRem(12),
  textDecoration: 'underline',
  '@laptop': {
    marginTop: 10,
    fontSize: toRem(14),
  },
})

const RoomPartyGraphic = styled(RoomPartyIcon, {
  heightWidth: 80,
  animation: `${upDownAnim} 1s linear infinite alternate`,
  '@laptop': {
    heightWidth: 110,
  },
})

const MusicalNote = styled(MusicalNoteIcon, {
  position: 'absolute',
  bottom: 0,
  heightWidth: 20,
  '@laptop': {
    heightWidth: 30,
  },
})

export const Rooms = () => {
  useRedirectOutUsers()
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const hasMounted = useHasMounted()

  if (!hasMounted) return null

  return (
    <Main>
      <RoomsHeading>Rooms</RoomsHeading>
      <RoomsList>
        <RoomListItem>
          <RoomPartyGraphic />
          <RoomItemHeading>Lofi</RoomItemHeading>
          <RoomItemTypeMusicText>
            Relaxing Lofi music, good for studying or programming.
          </RoomItemTypeMusicText>
          <RoomJoinLink>Join</RoomJoinLink>
          <RoomAuthorLink>by Tiger Abrodi</RoomAuthorLink>
          <MusicalNote
            css={{
              left: 0,
              transform: 'translate(10px, -10px)',
              '@tablet': { transform: 'translate(15px, -15px)' },
            }}
          />
          <MusicalNote
            css={{
              right: 0,
              transform: 'translate(-10px, -10px)',
              '@tablet': { transform: 'translate(-15px, -15px)' },
            }}
          />
        </RoomListItem>
      </RoomsList>
      <CreateRoomDialog dialogRef={dialogRef} />
    </Main>
  )
}

export default Rooms
