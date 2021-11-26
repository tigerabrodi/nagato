import { toRem } from '@lib/helpers'
import { styled } from 'stitches.config'
import {
  commonButtonActiveStyles,
  fadeInAnimation,
  SROnlyStyles,
} from './shared'

export const Main = styled('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Wrapper = styled('div', {
  width: 270,
  height: 405,
  boxShadow: '$shadowElevationLow',
  display: 'grid',
  paddingX: 20,
  paddingTop: 20,
  paddingBottom: 10,
  alignItems: 'center',
  justifyItems: 'center',
  backgroundColor: '$secondary',
  gridTemplateAreas:
    '"image image" "fullname fullname" "label label" "textarea textarea" "cancel save"',
  animation: fadeInAnimation,
  '@mobileM': {
    height: 470,
  },
  '@tablet': {
    width: 680,
    height: 790,
    paddingX: 60,
    paddingTop: 13,
  },
  '@desktop': {
    height: 850,
  },
})

export const ImageWrapper = styled('div', {
  gridArea: 'image',
  width: '100%',
  height: 158,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '$primary',
  '@tablet': {
    height: 350,
  },
})

export const Avatar = styled('div', {
  animation: fadeInAnimation,
  position: 'relative',
  width: 132,
  height: 123,
  '@tablet': {
    height: 288,
    width: 350,
  },
})

export const HiddenHeadingLevelOne = styled('h1', SROnlyStyles)

export const Fullname = styled('h2', {
  fontWeight: '$semiBold',
  fontSize: toRem(24),
  color: '$primary',
  gridArea: 'fullname',
  textAlign: 'center',
  marginTop: 10,
  '@tablet': {
    fontSize: toRem(40),
  },
})

export const commonButtonStyles = {
  width: 96,
  height: 31,
  backgroundColor: '$primary',
  boxShadow: '$shadowElevationLow',
  color: '$tertiary',
  fontWeight: '$medium',
  fontSize: toRem(16),
  textAlign: 'center',
  marginTop: 15,
  '@mobileM': {
    marginTop: 'revert',
    alignSelf: 'end',
  },
  '@tablet': {
    width: 180,
    height: 45,
    fontSize: toRem(20),
    boxShadow: '$shadowMedium',
    transition: 'all 0.2s ease-out',
    '&:hover': {
      transition: 'all 0.15s ease-out',
      transform: 'translateY(-3px) scale(1.005)',
      color: '$secondary',
      boxShadow: '0 4px 3px black',
    },
    ...commonButtonActiveStyles,
  },
}
