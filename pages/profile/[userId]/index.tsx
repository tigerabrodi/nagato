import * as React from 'react'
import {
  Avatar,
  commonProfileButtonHoverStyles,
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
import {
  commonButtonActiveStyles,
  DefaultAvatar4x,
  willChangeTransformStyles,
} from '@theme/shared'
import { toRem } from '@lib/helpers'
import { Spinner } from '@components/Spinner'
import { MusicalNoteIcon } from '@icons/MusicalNote'
import { useRedirectOutUsers } from 'hooks/useRedirectOutUsers'
import { supabase } from '@lib/client'

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
    transition: 'all 0.3s ease-out',
    ...willChangeTransformStyles,
    ...commonProfileButtonHoverStyles,
    ...commonButtonActiveStyles,
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
})

const noteStyles = {
  position: 'absolute',
  bottom: 0,
  heightWidth: 20,
}

const MusicalRightNote = styled(MusicalNoteIcon, {
  ...noteStyles,
  right: 0,
  transform: 'translate(-10px, -10px)',
  '@tablet': { transform: 'translate(-20px, -20px)', heightWidth: 40 },
})

const MusicalLeftNote = styled(MusicalNoteIcon, {
  ...noteStyles,
  left: 0,
  transform: 'translate(10px, -10px)',
  '@tablet': { transform: 'translate(20px, -20px)', heightWidth: 40 },
})

export const Profile = () => {
  useRedirectOutUsers()
  const {
    query: { userId },
    push,
  } = useRouter()

  const currentAuthUser = supabase.auth.user()

  const { hookStatus, user } = useGetUserWithId({
    userId: userId as string,
    selectProperties: 'avatarUrl, fullname, tasteOfMusic, userId',
  })

  const hasFinishedLoading = hookStatus !== 'loading' && hookStatus !== 'idle'

  React.useEffect(() => {
    if (!user && hasFinishedLoading) {
      toast.error('User was not found!')
      push('/rooms')
    }
  }, [hasFinishedLoading, push, user])

  if (!user || !currentAuthUser) {
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
          <Link passHref href={`/profile/${userId}/edit`}>
            <EditLink>Edit Profile</EditLink>
          </Link>
          <MusicalRightNote />
          <MusicalLeftNote />
        </Wrapper>
      </Main>
    )
  }

  const imageSrc = user.avatarUrl !== '' ? user.avatarUrl : DefaultAvatar4x

  const isOwner = currentAuthUser.id === user.userId

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
        {isOwner && (
          <Link passHref href={`/profile/${userId}/edit`}>
            <EditLink>Edit Profile</EditLink>
          </Link>
        )}
        <MusicalRightNote id={uuidv4()} />
        <MusicalLeftNote id={uuidv4()} />
      </Wrapper>
    </Main>
  )
}

export default Profile
