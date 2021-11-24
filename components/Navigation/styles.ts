import { toRem } from '@lib/helpers'
import { styled } from 'stitches.config'
import { DoubleMusicalNoteIcon } from '@icons/DoubleMusicalNote'
import { DanceIcon } from '@icons/Dance'
import { CSS } from '@stitches/react'
import { DoorIcon } from '@icons/Door'
import { commonButtonActiveStyles, SROnlyStyles } from '@theme/shared'

export const NavigationContainer = styled('nav', {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  height: 60,
  backgroundColor: '$primary',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderBottom: '3px solid $secondary',
  boxShadow: '0 0px 5px black',
  paddingX: 20,
  '@tablet': {
    paddingX: 80,
    height: 100,
    borderWidth: 5,
  },
  '@laptop': {
    paddingX: 90,
  },
  '@desktop': {
    paddingX: 110,
  },
})

export const HomeLink = styled('a', {
  color: '$secondary',
  fontWeight: '$semiBold',
  fontSize: toRem(25),
  position: 'relative',
  '@tablet': {
    fontSize: toRem(42),
  },
})

export const DoubleMusicalNote = styled(DoubleMusicalNoteIcon, {
  position: 'absolute',
  heightWidth: 15,
  top: 0,
  right: 0,
  transform: 'translate(90%, -40%)',
  '@tablet': {
    heightWidth: 30,
  },
})

export const SignInLink = styled('a', {
  color: '$tertiary',
  marginRight: 18,
  marginLeft: 'auto',
  fontWeight: '$medium',
  fontSize: toRem(15),
  '@tablet': {
    fontSize: toRem(28),
    marginRight: 60,
    transition: 'all 0.2s',
    '&:hover': {
      color: '$secondary',
      transform: 'translateY(-2px)',
    },
  },
})

export const SignUpLink = styled('a', {
  color: '$primary',
  backgroundColor: '$secondary',
  fontWeight: '$semiBold',
  padding: '5px 8px',
  fontSize: toRem(16),
  boxShadow: '$shadowElevationMedium',
  '@tablet': {
    fontSize: toRem(29),
    padding: '8px 15px',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '$tertiary',
      transform: 'translateY(-2px)',
    },
  },
})

export const LinksWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
})

export const AvatarLink = styled('a', {
  heightWidth: 40,
  marginLeft: 'auto',
  backgroundColor: '$secondary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '$shadowElevationLow',
  '@tablet': {
    heightWidth: 70,
    marginLeft: 'revert',
    '@tablet': {
      boxShadow: '$shadowMedium',
      transition: 'all 0.3s ease-out',
      '&:hover': {
        transition: 'all 0.15s ease-out',
        transform: 'translateY(-2px)',
        boxShadow: '0 3px 4px black',
      },
    },
  },
})

export const AvatarImage = styled('img', {
  width: 35,
  '@tablet': {
    width: 60,
  },
})

const commonMobileButtonStyles: CSS = {
  heightWidth: 50,
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$secondary',
  boxShadow: '$shadowElevationLow',
}

const commonLargeButtonStyles: CSS = {
  '@tablet': {
    boxShadow: '$shadowMedium',
    width: 140,
    height: 50,
    justifyContent: 'space-evenly',
    position: 'revert',
    transform: 'revert',
    transition: 'all 0.2s ease-out',
    '&:hover': {
      backgroundColor: '$tertiary',
      transform: 'translateY(-2px)',
      path: {
        fill: '$tertiary',
      },
    },
    ...commonButtonActiveStyles,
  },
  '@laptop': {
    width: 200,
    height: 53,
  },
}

export const JoinRoomButton = styled('button', {
  ...commonMobileButtonStyles,
  transform: 'translate(24px, -24px)',
  left: 0,
  '@tablet': {
    ...commonLargeButtonStyles,
    left: 'revert',
    marginLeft: 'auto',
  },
})

export const SignOutButton = styled('button', {
  ...commonMobileButtonStyles,
  transform: 'translate(-24px, -24px)',
  right: 0,
  '@tablet': {
    ...commonLargeButtonStyles,
    right: 'revert',
    marginLeft: 40,
    marginRight: 60,
  },
  '@laptop': {
    marginLeft: 50,
    marginRight: 110,
  },
  '@desktop': {
    marginLeft: 100,
    marginRight: 200,
  },
})

const commonIconStyles: CSS = {
  heightWidth: 40,
  '@tablet': {
    heightWidth: 35,
    backgroundColor: '$primary',
    padding: 5,
    path: {
      fill: '$secondary',
      transition: 'fill 0.2s',
    },
  },
  '@laptop': {
    heightWidth: 40,
  },
}

export const Dance = styled(DanceIcon, {
  ...commonIconStyles,
})

export const Door = styled(DoorIcon, {
  ...commonIconStyles,
})

export const ButtonText = styled('span', {
  ...SROnlyStyles,
  '@tablet': {
    all: 'revert',
    color: '$primary',
    fontWeight: '$semiBold',
    fontSize: toRem(18),
  },
  '@laptop': {
    fontSize: toRem(21),
  },
})
