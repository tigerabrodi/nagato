import * as React from 'react'
import { useHasMounted } from 'hooks/useHasMounted'
import { styled } from 'stitches.config'
import { CreateRoomDialog } from '@components/CreateRoomDialog'
import { useRedirectOutUsers } from 'hooks/useRedirectOutUsers'

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

export const Rooms = () => {
  useRedirectOutUsers()
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const hasMounted = useHasMounted()

  if (!hasMounted) return null

  return (
    <Main>
      <RoomsHeading>Rooms</RoomsHeading>
      <CreateRoomDialog dialogRef={dialogRef} />
    </Main>
  )
}

export default Rooms
