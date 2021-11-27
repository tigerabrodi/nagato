import { RoomPartyIcon } from '@icons/RoomParty'
import { toRem } from '@lib/helpers'
import { commonButtonActiveStyles } from '@theme/shared'
import { styled } from 'stitches.config'
import { DialogContent, DialogTrigger } from '@components/Dialog'

export const CloseButton = styled('button', {
  position: 'absolute',
  top: 15,
  right: 15,
  heightWidth: 18,
  svg: {
    heightWidth: '100%',
    path: {
      fill: '$primary',
    },
  },
  '@tablet': {
    top: 30,
    right: 40,
    heightWidth: 40,
    transition: 'all 0.4s ease-in-out',
    '&:hover': {
      transition: 'all 0.2s ease-in-out',
      transform: 'rotate(0.5turn)',
    },
  },
})

export const DialogTriggerButton = styled(DialogTrigger, {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  width: 130,
  height: 45,
  fontWeight: '$semiBold',
  fontSize: toRem(20),
  backgroundColor: '$tertiary',
  color: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  transform: 'translateY(-10px)',
  boxShadow: '$shadowElevationLow',
  zIndex: 10,
  '@tablet': {
    position: 'absolute',
    transform: 'translateY(0)',
    bottom: 'revert',
    left: 'revert',
    right: 0,
    top: 40,
    width: 185,
    height: 60,
    fontSize: toRem(25),
    boxShadow: '$shadowMedium',
    transition: 'all 0.2s ease-out',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.005)',
      backgroundColor: '$secondary',
      boxShadow: '0 2px 3px black',
      path: {
        fill: '$secondary',
      },
    },
    ...commonButtonActiveStyles,
  },
})

export const IconWrapper = styled('div', {
  heightWidth: 35,
  backgroundColor: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@tablet': {
    heightWidth: 50,
  },
})

export const RoomParty = styled(RoomPartyIcon, {
  heightWidth: 25,
  path: {
    transition: 'all 0.2s ease-out',
    fill: '$tertiary',
  },
  '@tablet': {
    heightWidth: 40,
  },
})

export const StyledDialogContent = styled(DialogContent, {
  width: 295,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 15,
  paddingX: 42,
  '@tablet': {
    width: '85vw',
  },
  '@laptop': {
    width: '75vw',
    maxWidth: 1000,
  },
})

export const DialogHeading = styled('h1', {
  fontWeight: '$bold',
  fontSize: toRem(24),
  color: '$primary',
  '@tablet': {
    fontSize: toRem(60),
  },
})

export const DialogLabel = styled('label', {
  marginTop: 30,
  fontSize: toRem(17),
  fontWeight: '$semiBold',
  color: '$primary',
  justifySelf: 'start',
  '@tablet': {
    marginTop: 50,
    fontSize: toRem(30),
  },
})

const commonInputMobileStyles = {
  width: 210,
  paddingLeft: 10,
  fontWeight: '$medium',
  fontSize: toRem(13),
  color: '$secondary',
  backgroundColor: '$primary',
  marginTop: 15,
}

const commonInputTabletStyles = {
  marginTop: 20,
  fontSize: toRem(23),
  width: '100%',
}

export const TitleInput = styled('input', {
  height: 30,
  ...commonInputMobileStyles,
  '@tablet': {
    height: 65,
    ...commonInputTabletStyles,
  },
})

export const TasteOfMusicTextarea = styled('textarea', {
  height: 85,
  paddingTop: 10,
  ...commonInputMobileStyles,
  '@tablet': {
    height: 160,
    ...commonInputTabletStyles,
  },
  '@desktop': {
    height: 200,
  },
})

export const CreateButton = styled('button', {
  marginTop: 35,
  fontWeight: '$bold',
  fontSize: toRem(18),
  color: '$secondary',
  backgroundColor: '$primary',
  boxShadow: '$shadowElevationLow',
  width: 110,
  height: 35,
  '@tablet': {
    boxShadow: '$shadowMedium',
    marginTop: 50,
    width: 240,
    height: 60,
    fontSize: toRem(35),
    transition: 'all 0.3s ease-out',
    '&:hover': {
      transition: 'all 0.15s ease-out',
      boxShadow: '0 2px 4px black',
      transform: 'translateY(-1px) scale(1.005)',
      color: '$tertiary',
    },
    ...commonButtonActiveStyles,
  },
  '@desktop': {
    height: 65,
  },
})

export const Form = styled('form', {
  display: 'grid',
  gridTemplateRows: 'auto auto auto auto auto',
  alignItems: 'center',
  justifyItems: 'center',
  '@tablet': {
    width: '80%',
  },
})
