import { MusicalNoteIcon } from '@icons/MusicalNote'
import { toRem } from '@lib/helpers'
import { keyframes } from '@stitches/react'
import { styled } from 'stitches.config'

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
})

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20,
  '@mobileM': {
    marginTop: 30,
  },
})

const Title = styled('h1', {
  fontSize: '$mobileHeading',
  color: '$secondary',
  fontWeight: '$bold',
  animation: fadeUpAnimation,
})

const Subtitle = styled('h2', {
  fontWeight: '$semiBold',
  fontSize: toRem(19),
  color: '$tertiary',
  marginTop: 15,
  animation: fadeUpAnimation,
  animationDelay: '0.25s',
})

const Text = styled('p', {
  fontWeight: '$medium',
  fontSize: toRem(16),
  maxWidth: '28ch',
  textAlign: 'center',
  marginTop: 10,
  color: '$tertiary',
  animation: fadeUpAnimation,
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
})

const MusicalNote = styled(MusicalNoteIcon, {
  heightWidth: 128,
  marginTop: 30,
  filter: 'drop-shadow(0 1px 2px white)',
  animation: fadeUpAnimation,
  animationDelay: '0.7s',
  '@mobileM': {
    marginTop: 45,
  },
  '@mobileL': {
    marginTop: 60,
  },
})

export const LandingPage = () => (
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
    <MusicalNote />
  </Main>
)

export default LandingPage
