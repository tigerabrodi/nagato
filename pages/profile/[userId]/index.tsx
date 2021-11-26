import * as React from 'react'
import {
  Avatar,
  Fullname as SharedFullname,
  HiddenHeadingLevelOne,
  ImageWrapper,
  Main,
  Wrapper as SharedWrapper,
} from '@theme/sharedProfileStyles'
import { v4 as uuidv4 } from 'uuid'
import { styled } from 'stitches.config'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useGetUserWithId } from 'hooks/useGetUserWithId'
import toast from 'react-hot-toast'
import { DefaultAvatar4x } from '@theme/shared'
import { toRem } from '@lib/helpers'
import { Spinner } from '@components/Spinner'
import { MusicalNoteIcon } from '@icons/MusicalNote'

const Fullname = styled(SharedFullname, {
  '@tablet': {
    marginTop: 20,
    fontSize: toRem(60),
  },
})

const TasteOfMusicText = styled('p', {
  fontWeight: '$regular',
  fontSize: toRem(14),
  color: '$primary',
  textAlign: 'center',
  marginTop: 8,
  '@tablet': {
    fontSize: toRem(30),
    width: '28ch',
    marginTop: 20,
  },
})

const EditLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$tertiary',
  boxShadow: '$shadowElevationLow',
  fontWeight: '$medium',
  marginTop: 'auto',
  fontSize: toRem(15),
  width: 115,
  height: 35,
  backgroundColor: '$primary',
  '@tablet': {
    width: 170,
    height: 60,
    fontSize: toRem(23),
  },
})

const Wrapper = styled(SharedWrapper, {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  height: 380,
  position: 'relative',
  '@mobileM': {
    bottom: 20,
  },
  '@tablet': {
    bottom: 'revert',
    width: 680,
    height: 790,
    paddingX: 60,
    paddingTop: 25,
    paddingBottom: 20,
  },
  '@desktop': {
    height: 850,
  },
})

const noteStyles = {
  position: 'absolute',
  bottom: 0,
  heightWidth: 20,
  '@tablet': {
    heightWidth: 40,
  },
}

const MusicalRightNote = styled(MusicalNoteIcon, {
  ...noteStyles,
  right: 0,
  transform: 'translate(-10px, -10px)',
  '@tablet': { transform: 'translate(-20px, -20px)' },
})

const MusicalLeftNote = styled(MusicalNoteIcon, {
  ...noteStyles,
  left: 0,
  transform: 'translate(10px, -10px)',
  '@tablet': { transform: 'translate(20px, -20px)' },
})

export const Profile = () => {
  const {
    query: { userId },
    push,
  } = useRouter()

  const { hookStatus, user } = useGetUserWithId({
    userId: userId as string,
    selectProperties: 'avatarUrl, fullname, tasteOfMusic',
  })

  React.useEffect(() => {
    // TODO Assert later in test
    if (!user && hookStatus !== 'loading' && hookStatus !== 'idle') {
      toast.error('User was not found!')
      push('/rooms')
    }
  }, [hookStatus, user, push])

  if (!user) {
    return (
      <Main>
        <Spinner />
        <Wrapper>
          <ImageWrapper
            css={{
              '@tablet': {
                height: 365,
              },
            }}
          />
          <Fullname>xxx</Fullname>
          <TasteOfMusicText>Taste of music</TasteOfMusicText>
          <Link passHref href={`/profile/${userId}/edit`}>
            <EditLink>Edit Profile</EditLink>
          </Link>
        </Wrapper>
      </Main>
    )
  }

  const imageSrc = user.avatarUrl !== '' ? user.avatarUrl : DefaultAvatar4x

  return (
    <Main>
      <HiddenHeadingLevelOne>{user.fullname} Profile</HiddenHeadingLevelOne>
      <Wrapper>
        <ImageWrapper
          css={{
            '@tablet': {
              height: 365,
            },
          }}
        >
          <Avatar
            css={{
              '@tablet': {
                height: 300,
                width: 360,
              },
            }}
          >
            <Image
              src={imageSrc}
              alt={user.fullname}
              layout="fill"
              objectFit="cover"
              objectPosition="top center"
              loading="eager"
              priority
            />
          </Avatar>
        </ImageWrapper>
        <Fullname>{user.fullname}</Fullname>
        <TasteOfMusicText>{user.tasteOfMusic}</TasteOfMusicText>
        <Link passHref href={`/profile/${userId}/edit`}>
          <EditLink>Edit Profile</EditLink>
        </Link>
        <MusicalRightNote id={uuidv4()} />
        <MusicalLeftNote id={uuidv4()} />
      </Wrapper>
    </Main>
  )
}

export default Profile
