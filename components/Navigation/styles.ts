import { toRem } from '@lib/helpers'
import { styled } from 'stitches.config'

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
  boxShadow: '$shadowElevationLow',
  paddingX: 20,
  '@tablet': {
    paddingX: 80,
    height: 100,
    borderWidth: 5,
  },
})

export const HomeLink = styled('a', {
  color: '$secondary',
  fontWeight: '$semiBold',
  fontSize: toRem(25),
  '@tablet': {
    fontSize: toRem(42),
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
  padding: '4px 6px',
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
