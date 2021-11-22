import { MusicalNoteIcon } from '@icons/MusicalNote'
import { toRem } from '@lib/helpers'
import { styled } from 'stitches.config'

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
})

const Subtitle = styled('h2', {
  fontWeight: '$semiBold',
  fontSize: toRem(19),
  color: '$tertiary',
  marginTop: 15,
})

const Text = styled('p', {
  fontWeight: '$medium',
  fontSize: toRem(16),
  maxWidth: '28ch',
  textAlign: 'center',
  marginTop: 10,
  color: '$tertiary',
  '&:first-of-type': {
    marginTop: 20,
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
