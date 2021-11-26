import { MusicalNoteIcon } from '@icons/MusicalNote'
import { v4 as uuidv4 } from 'uuid'
import { toRem } from '@lib/helpers'
import { keyframes } from '@stitches/react'
import { useRedirectAuthUsers } from 'hooks/useRedirectAuthUsers'
import { styled } from 'stitches.config'
import { willChangeTransformStyles } from '@theme/shared'
import { useHasMounted } from 'hooks/useHasMounted'

const fadeUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

const fadeUpAnimation = `${fadeUp} 0.3s ease-out both`

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '@tablet': {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: 100,
    padding: '0 20px',
  },
  '@desktop': {
    columnGap: '20vw',
  },
})

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20,
  '@mobileM': {
    marginTop: 30,
  },
  '@tablet': {
    marginTop: 80,
  },
})

const Title = styled('h1', {
  fontSize: '$mobileHeading',
  color: '$secondary',
  fontWeight: '$bold',
  animation: fadeUpAnimation,
  ...willChangeTransformStyles,
  '@tablet': {
    fontWeight: '$bold',
    fontSize: toRem(100),
  },
})

const Subtitle = styled('h2', {
  fontWeight: '$semiBold',
  fontSize: toRem(19),
  color: '$tertiary',
  marginTop: 15,
  animation: fadeUpAnimation,
  ...willChangeTransformStyles,
  animationDelay: '0.25s',
  '@tablet': {
    marginTop: 25,
    fontSize: toRem(36),
    textAlign: 'center',
  },
})

const Text = styled('p', {
  fontWeight: '$medium',
  fontSize: toRem(16),
  maxWidth: '28ch',
  textAlign: 'center',
  marginTop: 10,
  color: '$tertiary',
  animation: fadeUpAnimation,
  ...willChangeTransformStyles,
  animationDelay: '0.6s',
  '&:first-of-type': {
    marginTop: 20,
    animationDelay: '0.45s',
  },
  '@mobileM': {
    marginTop: 20,
    '&:first-of-type': {
      marginTop: 35,
    },
  },
  '@tablet': {
    fontSize: toRem(30),
    marginTop: 60,
    '&:first-of-type': {
      marginTop: 80,
    },
  },
})

const MusicalNote = styled(MusicalNoteIcon, {
  heightWidth: 128,
  marginTop: 30,
  filter: 'drop-shadow(0 1px 2px white)',
  animation: fadeUpAnimation,
  ...willChangeTransformStyles,
  animationDelay: '0.7s',
  '@mobileM': {
    marginTop: 45,
  },
  '@mobileL': {
    marginTop: 60,
  },
  '@tablet': {
    marginTop: 160,
    heightWidth: 'min(350px, 29vw)',
  },
})

export const LandingPage = () => {
  useRedirectAuthUsers()
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return (
      <Main>
        <Wrapper />
      </Main>
    )
  }

  return (
    <Main>
      <Wrapper>
        <Title>Nagato</Title>
        <Subtitle>Listen to music with friends.</Subtitle>
        <Text>
          A place where you can vibe with others. Create a room and have your
          friends join the it.
        </Text>
        <Text>
          Perfect when studying together, pair programming, chilling or anything
          else!
        </Text>
      </Wrapper>
      <MusicalNote id={uuidv4()} />
    </Main>
  )
}

export default LandingPage
