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
  borderBottom: '2px solid $secondary',
  boxShadow: '$shadowElevationLow',
  paddingX: 20,
})

export const HomeLink = styled('a', {
  color: '$secondary',
  fontWeight: '$semiBold',
  fontSize: toRem(25),
})

export const SignInLink = styled('a', {
  color: '$tertiary',
  marginRight: 15,
  marginLeft: 'auto',
  fontWeight: '$medium',
  fontSize: toRem(15),
})

export const SignUpLink = styled('a', {
  color: '$primary',
  backgroundColor: '$secondary',
  fontWeight: '$semiBold',
  padding: '4px 6px',
  fontSize: toRem(16),
  boxShadow: '$shadowElevationMedium',
})

export const LinksWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
})
