import { toRem } from '@lib/helpers'
import { styled } from 'stitches.config'
import { EyeClosedIcon } from '@icons/EyeClosed'
import { EyeOpenedIcon } from '@icons/EyeOpened'
import { commonButtonActiveStyles } from './shared'

export const Main = styled('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '80%',
  backgroundColor: '$secondary',
  paddingY: 12,
  paddingX: 16,
  boxShadow: '$shadowElevationMedium',
  '@mobileM': {
    height: 440,
  },
  '@tablet': {
    width: '80%',
    maxWidth: 1200,
    height: 'auto',
    padding: '20px 100px 40px 100px',
  },
  '@laptop': {
    paddingX: 200,
  },
  '@desktop': {
    paddingX: 300,
  },
})

export const Heading = styled('h1', {
  fontWeight: '$bold',
  fontSize: '$mobileHeading',
  color: '$primary',
  '@tablet': {
    fontSize: '$desktopHeading',
  },
})

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
})

export const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginTop: 15,
  width: '100%',
  '&:first-of-type': {
    marginTop: 22,
  },
  '@tablet': {
    marginTop: 40,
    '&:first-of-type': {
      marginTop: 50,
    },
  },
})

export const Label = styled('label', {
  fontSize: toRem(16),
  fontWeight: '$medium',
  color: '$primary',
  '@tablet': {
    fontSize: toRem(27),
  },
})

export const Input = styled('input', {
  width: '100%',
  height: 30,
  color: '$tertiary',
  backgroundColor: '$primary',
  paddingLeft: 10,
  marginTop: 10,
  fontWeight: '$medium',
  fontSize: toRem(14),
  transition: 'box-shadow 0.1s',
  '&:focus': {
    boxShadow: '0 1px 3px black',
  },
  '@tablet': {
    height: 50,
    fontSize: toRem(22),
    paddingLeft: 15,
    marginTop: 20,
  },
})

export const SubmitButton = styled('button', {
  width: '100%',
  height: 38,
  fontSize: toRem(20),
  fontWeight: '$semiBold',
  backgroundColor: '$primary',
  color: '$secondary',
  marginTop: 40,
  boxShadow: '$shadowElevationLow',
  '@mobileM': {
    marginTop: 65,
  },
  '@tablet': {
    maxWidth: 320,
    height: 70,
    fontSize: 36,
    marginTop: 100,
    boxShadow: '0 1px 3px black',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      transition: 'all 0.15s ease-out',
      transform: 'translateY(-3px)',
      boxShadow: '0 2px 6px black',
    },
    ...commonButtonActiveStyles,
  },
})

export const PasswordWrapper = styled('div')

export const ShowPasswordButton = styled('button', {
  position: 'absolute',
  right: 0,
  bottom: 0,
  lineHeight: 0,
  '@tablet': {
    '&:hover': {
      path: {
        fill: '$tertiary',
      },
    },
  },
})

const pathStyles = {
  path: {
    transition: 'fill 0.2s ease-out',
  },
}

export const EyeClosed = styled(EyeClosedIcon, {
  width: 20,
  height: 19,
  '@tablet': {
    width: 32,
    height: 31,
    ...pathStyles,
  },
})

export const EyeOpened = styled(EyeOpenedIcon, {
  width: 20,
  height: 13,
  '@tablet': {
    width: 32,
    height: 21,
    ...pathStyles,
  },
})
