import { DialogContent } from '@components/Dialog'
import { SpinnerSVG } from '@components/Spinner'
import { ClockIcon } from '@icons/Clock'
import { toRem } from '@lib/helpers'
import { SROnlyStyles } from '@theme/shared'
import { styled } from 'stitches.config'

export const StyledDialogContent = styled(DialogContent, {
  width: 300,
  height: 510,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 15,
  paddingBottom: 20,
  paddingX: 15,
  marginTop: 0,
  '@mobileM': {
    width: 340,
    height: 550,
  },
  '@tablet': {
    width: '90vw',
    height: '90vh',
    maxWidth: 800,
    paddingBottom: 30,
    paddingX: 135,
    paddingTop: 20,
  },
  '@laptop': {
    width: '70vw',
    maxWidth: 1000,
  },
  '@desktop': {
    paddingX: 220,
  },
})

export const DialogHeading = styled('h1', {
  fontWeight: '$bold',
  fontSize: toRem(36),
  color: '$primary',
  '@tablet': {
    fontSize: toRem(64),
  },
})

export const HiddenDialogLabel = styled('label', {
  ...SROnlyStyles,
})

export const SearchButton = styled('button', {
  width: 60,
  height: 35,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$primary',
  svg: {
    heightWidth: 22,
    path: {
      fill: '$secondary',
    },
  },
  '@tablet': {
    width: 75,
    height: 40,
    svg: {
      heightWidth: 25,
    },
  },
  '@laptop': {
    width: 90,
  },
})

export const SearchInput = styled('input', {
  height: 35,
  width: '75%',
  paddingLeft: 10,
  fontWeight: '$medium',
  fontSize: toRem(14),
  color: '$secondary',
  backgroundColor: '$primary',
  '@tablet': {
    fontSize: toRem(18),
    width: '80%',
    height: 40,
  },
  '@desktop': {
    width: '82%',
  },
})

export const Form = styled('form', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 15,
  '@tablet': {
    marginTop: 25,
  },
})

export const SongsSection = styled('section', {
  marginTop: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  '@tablet': {
    marginTop: 65,
  },
})

export const SongHeading = styled('h2', {
  color: '$primary',
  fontWeight: '$bold',
  fontSize: toRem(32),
  '@tablet': {
    fontSize: toRem(52),
  },
})

export const LoadMoreButton = styled('button', {
  width: 140,
  height: 40,
  boxShadow: '$shadowElevationLow',
  fontSize: toRem(18),
  fontWeight: '$semiBold',
  color: '$secondary',
  backgroundColor: '$primary',
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  svg: {
    heightWidth: 27,
  },
  '@tablet': {
    fontSize: toRem(22),
    width: 170,
    height: 50,
    svg: {
      heightWidth: 33,
    },
    boxShadow: '$shadowMedium',
  },
})

export const SongsList = styled('ul', {
  width: '100%',
  maxHeight: 210,
  overflowY: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: 10,
  '@mobileM': {
    maxHeight: 400,
  },
  '@tablet': {
    marginTop: 20,
  },
})

export const SongItemWrapper = styled('li', {
  display: 'grid',
  width: '100%',
  height: 40,
  gridTemplateAreas: "'play title clock time' 'play author clock time'",
  gridTemplateColumns: '20% 60% 10% 10%',
  alignItems: 'center',
  justifyItems: 'center',
  borderBottom: '2px solid $primary',
  '&:not(:first-of-type)': {
    marginTop: 10,
  },
  '@tablet': {
    height: 50,
    '&:not(:first-of-type)': {
      marginTop: 15,
    },
  },
})

export const SongItemPlayButton = styled('button', {
  gridArea: 'play',
  svg: {
    heightWidth: 18,
    '@tablet': {
      heightWidth: 24,
    },
  },
})

export const SongItemTitle = styled('h3', {
  fontWeight: '$medium',
  fontSize: toRem(11),
  color: '$primary',
  gridArea: 'title',
  justifySelf: 'start',
  paddingTop: 5,
  '@tablet': {
    fontSize: toRem(14),
  },
})

export const SongItemAuthor = styled('p', {
  fontWeight: '$regular',
  fontSize: toRem(10),
  color: '$primary',
  gridArea: 'author',
  justifySelf: 'start',
  paddingBottom: 5,
  '@tablet': {
    fontSize: toRem(13),
  },
})

export const Clock = styled(ClockIcon, {
  gridArea: 'clock',
  heightWidth: 12,
  alignSelf: 'end',
  marginBottom: 5,
  '@tablet': {
    heightWidth: 18,
  },
})

export const Time = styled('span', {
  gridArea: 'time',
  fontWeight: '$regular',
  fontSize: toRem(10),
  color: '$primary',
  alignSelf: 'end',
  paddingBottom: 5,
  '@tablet': {
    fontSize: toRem(13),
  },
})

export const FirstSearchSpinner = styled(SpinnerSVG, {
  position: 'absolute',
  top: 10,
  left: 10,
  right: 'revert',
  path: {
    fill: '$primary',
  },
  heightWidth: 25,
  '@tablet': {
    heightWidth: 40,
  },
})
