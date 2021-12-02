import { styled } from 'stitches.config'
import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toRem } from '@lib/helpers'
import {
  bumpingAnimation,
  commonButtonActiveStyles,
  SROnlyStyles,
} from '@theme/shared'
import { SearchIcon } from '@icons/Search'
import { DeleteIcon } from '@icons/Delete'
import { PlayIcon } from '@icons/Play'
import { StopIcon } from '@icons/Stop'
import { CopyIcon } from '@icons/Copy'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { supabase } from '@lib/client'
import { Room, User } from '@lib/types'
import { Spinner } from '@components/Spinner'
import { useLoadingStore } from '@components/Spinner/store'

const Main = styled('main', {
  display: 'grid',
  gridTemplateAreas:
    '"title title title" "tasteOfMusic tasteOfMusic tasteOfMusic" "owner owner owner" "search playStop delete" "song song song" "copy copy copy"',
  alignItems: 'center',
  justifyItems: 'center',
  gridTemplateRows: '15% 8% 12% 38% 8% 19%',
  '@mobileM': {
    gridTemplateRows: '17% 8% 10% 35% 8% 22%',
  },
  '@mobileL': {
    gridTemplateRows: '15% 8% 11% 34% 8% 24%',
  },
  '@tablet': {
    gridTemplateAreas:
      '"title title title" "tasteOfMusic tasteOfMusic tasteOfMusic" "owner owner owner" "copy playStop search" "copy playStop delete" "song song song"',
    gridTemplateColumns: '33% 34% 33%',
    gridTemplateRows: '14% 6% 14% 19% 23% 24%',
  },
  '@laptop': {
    marginX: 'auto',
    maxWidth: '90vw',
    gridTemplateRows: '14% 6% 14% 16% 22% 20%',
  },
  '@desktop': {
    maxWidth: '80vw',
  },
})

const TitleHeading = styled('h1', {
  fontWeight: '$bold',
  fontSize: toRem(40),
  color: '$tertiary',
  gridArea: 'title',
  alignSelf: 'end',
  '@mobileL': {
    fontSize: toRem(42),
  },
  '@tablet': {
    alignSelf: 'center',
    fontSize: toRem(60),
  },
})

const TypeOfMusicText = styled('p', {
  fontWeight: '$medium',
  fontSize: toRem(18),
  color: '$secondary',
  gridArea: 'tasteOfMusic',
  textAlign: 'center',
  '@mobileL': {
    fontSize: toRem(20),
  },
  '@tablet': {
    fontSize: toRem(25),
    alignSelf: 'start',
  },
})

const OwnerWrapper = styled('div', {
  gridArea: 'owner',
  display: 'flex',
  alignItems: 'center',
  columnGap: 8,
  fontWeight: '$regular',
  fontSize: toRem(14),
  color: '$tertiary',
  '@mobileL': {
    fontSize: toRem(16),
  },
  '@tablet': {
    fontSize: toRem(20),
    alignSelf: 'start',
    columnGap: 15,
  },
})

const OwnerLink = styled('a', {
  textDecoration: 'underline',
  color: 'inherit',
})

const OwnerImageWrapper = styled('div', {
  position: 'relative',
  width: 30,
  height: 28,
  '@tablet': {
    heightWidth: 45,
  },
})

const commonButtonMobileStyles = {
  heightWidth: 30,
  boxShadow: '$shadowElevationLow',
  backgroundColor: '$tertiary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'end',
  svg: {
    heightWidth: 20,
  },
}

const commonButtonTabletStyles = {
  '@tablet': {
    alignSelf: 'start',
    boxShadow: '$shadowMedium',
    width: 130,
    height: 45,
    justifyContent: 'space-evenly',
    transition: 'all 0.2s ease-out',
    svg: {
      heightWidth: 33,
      backgroundColor: '$primary',
      padding: 5,
      path: {
        fill: '$tertiary',
        transition: 'fill 0.2s ease-out',
      },
    },
    '&:hover': {
      backgroundColor: '$secondary',
      boxShadow: '0 2px 3px black',
      transform: 'translateY(-2px)',
      path: {
        fill: '$secondary',
      },
    },
    '&:active': {
      transition: 'all 0.1s ease-out',
      transform: 'translateY(0)',
      boxShadow: '0 1px 3px black',
    },
  },
}

const SearchButton = styled('button', {
  ...commonButtonMobileStyles,
  gridArea: 'search',
  ...commonButtonTabletStyles,
})

const DeleteButton = styled('button', {
  ...commonButtonMobileStyles,
  gridArea: 'delete',
  ...commonButtonTabletStyles,
})

const ButtonText = styled('span', {
  ...SROnlyStyles,
  '@tablet': {
    all: 'revert',
    fontWeight: '$semiBold',
    fontSize: toRem(17),
  },
})

const PlayWrapper = styled('div', {
  heightWidth: 140,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$shadowElevationLow',
  backgroundColor: '$secondary',
  gridArea: 'playStop',
  alignSelf: 'end',
  /*   '@noReducedMotion': {
    animation: bumpingAnimation,
  }, */
  '@mobileL': {
    heightWidth: 170,
  },
  '@tablet': {
    alignSelf: 'start',
    heightWidth: 300,
  },
})

const Play = styled(PlayIcon, {
  heightWidth: 60,
  '@mobileL': {
    heightWidth: 80,
  },
  '@tablet': {
    heightWidth: 120,
  },
})

const Stop = styled(StopIcon, {
  heightWidth: 50,
  '@mobileL': {
    heightWidth: 70,
  },
  '@tablet': {
    heightWidth: 110,
  },
})

const SongText = styled('p', {
  gridArea: 'song',
  fontWeight: '$regular',
  fontSize: toRem(12),
  textAlign: 'center',
  color: '$tertiary',
  alignSelf: 'end',
  '@mobileL': {
    fontSize: toRem(15),
  },
  '@tablet': {
    alignSelf: 'start',
    fontSize: toRem(20),
  },
})

const CopyIDButton = styled('button', {
  gridArea: 'copy',
  fontWeight: '$semiBold',
  fontSize: toRem(14),
  backgroundColor: '$secondary',
  color: '$primary',
  boxShadow: '$shadowElevationLow',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: 100,
  height: 35,
  '@mobileL': {
    width: 115,
    height: 40,
    fontSize: toRem(16),
  },
  '@tablet': {
    alignSelf: 'start',
    boxShadow: '$shadowMedium',
    width: 130,
    height: 45,
    fontSize: toRem(17),
    transition: 'all 0.2s ease-out',
    '&:hover': {
      backgroundColor: '$tertiary',
      transform: 'scale(1.003) translateY(-2px)',
      boxShadow: '0 2px 3px black',
      path: {
        fill: '$tertiary',
      },
    },
    ...commonButtonActiveStyles,
  },
})

const Copy = styled(CopyIcon, {
  heightWidth: 20,
  padding: 3,
  backgroundColor: '$primary',
  '@mobileL': {
    heightWidth: 25,
    padding: 4,
  },
  '@tablet': {
    heightWidth: 28,
    path: {
      transition: 'fill 0.2s ease-out',
    },
  },
})

type Router = {
  query: {
    roomId: string
  }
}

export const RoomDetail = () => {
  const [room, setRoom] = React.useState<Room | null>(null)
  const { setStatus } = useLoadingStore()
  const [roomOwner, setRoomOwner] = React.useState<User | null>(null)
  const {
    query: { roomId },
    push,
  } = useRouter() as ReturnType<typeof useRouter> & Router

  const currentAuthUser = supabase.auth.user()

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId)
    toast.success('Room ID copied to clipboard!')
  }

  React.useEffect(() => {
    if (room || !roomId) {
      return
    }

    setStatus('loading')
    const getCurrentRoom = async () => {
      const { data: supaRoom } = await supabase
        .from<Room>('rooms')
        .select('id, owner, ownerFullname, title, typeOfMusic, currentTrack')
        .eq('id', roomId)
        .single()

      return { supaRoom }
    }

    const getRoomOwner = async (supaRoom: Room) => {
      const { data: supaRoomOwner } = await supabase
        .from<User>('users')
        .select('avatarUrl')
        .eq('userId', supaRoom.owner)
        .single()

      return { supaRoomOwner }
    }

    const fetchAndSetRoom = async () => {
      const { supaRoom } = await getCurrentRoom()

      if (!supaRoom) {
        toast.success(`Room was not found!`)
        push('/rooms')
        setStatus('error')
        return
      }

      const { supaRoomOwner } = await getRoomOwner(supaRoom)

      setRoomOwner(supaRoomOwner)
      setRoom(supaRoom)
      setStatus('success')
    }

    fetchAndSetRoom()
  }, [push, room, roomId, setStatus])

  React.useEffect(() => {
    /* Realtime needed to redirect all users in the room. We are listening to all events of rooms, and not specifically DELETE, because Supabase is messing with me ait, annoying, but ye */
    const onDeleteRoomSubscription = supabase
      .from<Room>('rooms')
      .on('*', (payload) => {
        const isCurrentRoomDeleteEvent =
          payload.eventType === 'DELETE' &&
          Number(payload.old.id) === Number(roomId)
        if (isCurrentRoomDeleteEvent) {
          toast.success(`Room ${room!.title} was deleted!`)
          push('/rooms')
        }
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(onDeleteRoomSubscription)
    }
  }, [push, room, roomId])

  const deleteRoom = async () =>
    await supabase.from<Room>('rooms').delete().eq('id', roomId).single()

  if (!room || !roomOwner || !currentAuthUser) {
    return (
      <Main>
        <Spinner />
      </Main>
    )
  }

  const hasRoomCurrentTrack = Boolean(room.currentTrack)

  const roomOwnerAvatar =
    roomOwner.avatarUrl !== '' ? roomOwner.avatarUrl : '/DefaultAvatar4x.jpg'

  const isOwner = room.owner === currentAuthUser.id

  return (
    <Main>
      <TitleHeading>{room.title}</TitleHeading>
      <TypeOfMusicText>{room.typeOfMusic}</TypeOfMusicText>
      <OwnerWrapper>
        <span aria-hidden="true">By</span>
        <Link passHref href={`/profile/${room.owner}`}>
          <OwnerLink aria-label={`By ${room.ownerFullname}`}>
            {room.ownerFullname}
          </OwnerLink>
        </Link>
        <OwnerImageWrapper>
          <Image
            src={roomOwnerAvatar}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="top center"
            priority
          />
        </OwnerImageWrapper>
      </OwnerWrapper>
      {isOwner && (
        <>
          <SearchButton>
            <ButtonText>Search</ButtonText>
            <SearchIcon />
          </SearchButton>
          <DeleteButton onClick={() => deleteRoom()}>
            <ButtonText>Delete</ButtonText>
            <DeleteIcon />
          </DeleteButton>
        </>
      )}
      <PlayWrapper
        aria-hidden="true"
        css={{ animation: hasRoomCurrentTrack ? bumpingAnimation : undefined }}
      >
        {hasRoomCurrentTrack ? <Stop /> : <Play />}
      </PlayWrapper>
      <SongText>
        {hasRoomCurrentTrack
          ? room.currentTrack!.name
          : 'No song is being played.'}
      </SongText>
      <CopyIDButton onClick={() => copyRoomId()}>
        Copy ID
        <Copy />
      </CopyIDButton>
    </Main>
  )
}

export default RoomDetail
