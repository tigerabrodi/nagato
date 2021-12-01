import { toRem } from '@lib/helpers'
import { commonButtonActiveStyles } from '@theme/shared'
import { styled } from 'stitches.config'
import { DialogContent } from '@components/Dialog'

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
    paddingBottom: 50,
    paddingTop: 30,
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

export const RoomIDInput = styled('input', {
  height: 30,
  ...commonInputMobileStyles,
  '@tablet': {
    height: 65,
    ...commonInputTabletStyles,
  },
})

export const JoinButton = styled('button', {
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
    marginTop: 160,
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
