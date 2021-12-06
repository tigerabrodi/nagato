import { styled } from 'stitches.config'
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

export const RoomListItem = styled('li', {
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

export const RoomItemHeading = styled('h2', {
  color: '$secondary',
  fontWeight: '$semiBold',
  fontSize: toRem(30),
  marginTop: 10,
  textAlign: 'center',
  '@laptop': {
    fontSize: toRem(40),
  },
})

export const RoomItemTypeMusicText = styled('p', {
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

export const RoomJoinLink = styled('a', {
  width: 84,
  height: 28,
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

export const RoomAuthorLink = styled('a', {
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

export const RoomPartyGraphic = styled(RoomPartyIcon, {
  heightWidth: 80,
  animation: `${upDownAnim} 1s linear infinite alternate`,
  '@laptop': {
    heightWidth: 110,
  },
})

export const MusicalNote = styled(MusicalNoteIcon, {
  position: 'absolute',
  bottom: 0,
  heightWidth: 20,
  '@laptop': {
    heightWidth: 30,
  },
})
