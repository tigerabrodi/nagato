import * as React from 'react'
import { useHasMounted } from 'hooks/useHasMounted'
import { styled } from 'stitches.config'
import { CreateRoomDialog } from '@components/CreateRoomDialog'
import { useRedirectOutUsers } from 'hooks/useRedirectOutUsers'
import { Room } from '@lib/types'
import { supabase } from '@lib/client'
import { useLoadingStore } from '@components/Spinner/store'
import { RoomItem } from '@components/RoomItem'

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

export const Rooms = () => {
  useRedirectOutUsers()
  const [rooms, setRooms] = React.useState<Room[] | null>(null)
  const { setStatus } = useLoadingStore()
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const hasMounted = useHasMounted()

  React.useEffect(() => {
    const fetchRooms = async () => {
      setStatus('loading')
      const { data: rooms } = await supabase.from('rooms').select()
      setRooms(rooms)
      setStatus('success')
    }

    fetchRooms()
    const mySubscription = supabase
      .from('rooms')
      .on('*', () => {
        fetchRooms()
      })
      .subscribe()
    return () => {
      supabase.removeSubscription(mySubscription)
    }
  }, [setStatus])

  if (!hasMounted) {
    return (
      <Main>
        <RoomsHeading>Rooms</RoomsHeading>
        <CreateRoomDialog dialogRef={dialogRef} />
      </Main>
    )
  }

  return (
    <Main>
      <RoomsHeading>Rooms</RoomsHeading>
      <RoomsList>
        {rooms && rooms.map((room) => <RoomItem key={room.id} room={room} />)}
      </RoomsList>
      <CreateRoomDialog dialogRef={dialogRef} />
    </Main>
  )
}

export default Rooms
