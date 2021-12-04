import { Room } from '@lib/types'
import Link from 'next/link'
import {
  MusicalNote,
  RoomAuthorLink,
  RoomItemHeading,
  RoomItemTypeMusicText,
  RoomJoinLink,
  RoomListItem,
  RoomPartyGraphic,
} from './styles'

type Props = {
  room: Room
}

export const RoomItem = ({ room }: Props) => {
  return (
    <RoomListItem>
      <RoomPartyGraphic />
      <RoomItemHeading>{room.title}</RoomItemHeading>
      <RoomItemTypeMusicText>{room.typeOfMusic}</RoomItemTypeMusicText>
      <Link passHref href={`/rooms/${room.id}`}>
        <RoomJoinLink aria-label={`Join room ${room.title}`}>Join</RoomJoinLink>
      </Link>
      <Link passHref href={`/profile/${room.owner}`}>
        <RoomAuthorLink>by {room.ownerFullname}</RoomAuthorLink>
      </Link>
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
  )
}
