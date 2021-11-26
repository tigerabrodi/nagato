import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CloudIcon } from '@icons/Cloud'
import { toRem } from '@lib/helpers'
import {
  Main,
  Wrapper,
  Fullname,
  ImageWrapper,
  Avatar,
  HiddenHeadingLevelOne,
  commonProfileButtonHoverStyles,
} from '@theme/sharedProfileStyles'
import {
  focusStyles,
  SROnlyStyles,
  DefaultAvatar4x,
  commonButtonActiveStyles,
} from '@theme/shared'
import { styled } from 'stitches.config'
import { useRouter } from 'next/router'
import { supabase } from '@lib/client'
import toast from 'react-hot-toast'
import { useFormState } from 'hooks/useFormState'
import { useHasMounted } from 'hooks/useHasMounted'
import { useLoadingStore } from '@components/Spinner/store'
import { Spinner } from '@components/Spinner'
import { useGetUserWithId } from 'hooks/useGetUserWithId'

const AvatarUploadHiddenInput = styled('input', {
  ...SROnlyStyles,
  '&:focus-visible + label': {
    ...focusStyles,
  },
})

const AvatarUploadLabel = styled('label', {
  cursor: 'pointer',
  position: 'absolute',
  bottom: 0,
  right: 0,
  transform: 'translate(-8px, -4px)',
  heightWidth: 20,
  '@tablet': {
    heightWidth: 40,
    transform: 'translate(-20px, -10px)',
    transition: 'transform 0.25s ease-out',
    '&:hover': {
      transition: 'all 0.15s ease-out',
      transform: 'translate(-20px, -11px)',
      svg: {
        transition: 'all 0.15s ease-out',
        filter: 'drop-shadow(0 1px 2px black)',
        path: {
          transition: 'all 0.15s ease-out',
          fill: '$tertiary',
        },
      },
    },
  },
})

const CloudUpload = styled(CloudIcon)

const TasteMusicLabel = styled('label', {
  fontWeight: '$medium',
  fontSize: toRem(16),
  color: '$primary',
  justifySelf: 'start',
  marginTop: 10,
  gridArea: 'label',
  '@tablet': {
    fontSize: toRem(24),
  },
})

const TasteMusicTextarea = styled('textarea', {
  gridArea: 'textarea',
  fontWeight: '$regular',
  width: '100%',
  height: 80,
  backgroundColor: '$primary',
  color: '$tertiary',
  paddingX: 7,
  paddingTop: 10,
  marginTop: 9,
  fontSize: toRem(12),
  '@mobileM': {
    marginTop: 'revert',
    height: 100,
  },
  '@tablet': {
    paddingX: 15,
    paddingTop: 15,
    height: 180,
    marginTop: 10,
    fontSize: toRem(20),
  },
  '@desktop': {
    marginTop: 'revert',
  },
})

const commonProfileButtonStyles = {
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
    ...commonProfileButtonHoverStyles,
    ...commonButtonActiveStyles,
  },
}

const CancelLink = styled('a', {
  ...commonProfileButtonStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gridArea: 'cancel',
  justifySelf: 'start',
})

const SaveButton = styled('button', {
  ...commonProfileButtonStyles,
  gridArea: 'save',
  justifySelf: 'end',
})

const ProfileEdit = () => {
  const {
    formState: { tasteOfMusic },
    setFormState,
    handleChange,
  } = useFormState({ tasteOfMusic: '' })
  const hasMounted = useHasMounted()
  const { setStatus } = useLoadingStore()
  const {
    query: { userId },
    push,
  } = useRouter()

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null)
  const currentAuthUser = supabase.auth.user()

  const { user } = useGetUserWithId({
    userId: currentAuthUser?.id,
    selectProperties: 'avatarUrl, fullname, tasteOfMusic',
  })

  React.useEffect(() => {
    if (!currentAuthUser || !userId) return

    /* TODO Write test for this later. */
    if (currentAuthUser.id !== userId) {
      push('/rooms')
      toast.error("You don't have permission to edit this profile.")
      return
    }
  }, [currentAuthUser, push, userId])

  React.useEffect(() => {
    if (user) {
      setFormState({
        tasteOfMusic: user.tasteOfMusic,
      })
    }
  }, [user, setFormState])

  const userAvatar = user?.avatarUrl
  const imageAlt = avatarUrl || userAvatar !== '' ? 'Avatar' : 'Default Avatar'
  const imageSrc = avatarUrl
    ? avatarUrl
    : userAvatar && userAvatar !== ''
    ? userAvatar
    : DefaultAvatar4x

  const getPublicUrlFile = (filePath: string) => {
    const { publicURL, error: getUrlError } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    if (getUrlError) {
      toast.error(getUrlError.message)
      setStatus('error')
      return
    }

    return publicURL
  }

  const uploadFile = async (filePath: string, file: File) => {
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      toast.error(uploadError.message)
      setStatus('error')
      return
    }
  }

  const handleFileSubmission = async (file: File | null) => {
    if (!file) {
      return
    }

    const fileExtension = file.name.split('.').pop()
    const fileName = `${Date.now()}${currentAuthUser!.id}.${fileExtension}`
    const filePath = fileName

    await uploadFile(filePath, file)

    const publicAvatarUrl = getPublicUrlFile(filePath)

    await supabase
      .from('users')
      .update({ avatarUrl: publicAvatarUrl })
      .match({ userId: currentAuthUser!.id })
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (!file) {
      toast.error('You must select an image to upload.')
      return
    }
    setAvatarUrl(window.URL.createObjectURL(file))
    setAvatarFile(file)
    toast.success(
      'Successfully uploaded your new avatar, save to keep the changes!'
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    await handleFileSubmission(avatarFile)

    const { error: updateUserError } = await supabase
      .from('users')
      .update({ tasteOfMusic })
      .match({ userId: currentAuthUser!.id })

    if (updateUserError) {
      setStatus('error')
      toast.error(updateUserError.message)
      return
    }

    setStatus('success')
    toast.success('Successfully updated your profile!')
    push(`/profile/${currentAuthUser!.id}`)
  }

  if (!hasMounted) {
    return (
      <Main>
        <Spinner />
        <Wrapper>
          <ImageWrapper />
          <Fullname>xxx</Fullname>
          <TasteMusicLabel>Taste of music</TasteMusicLabel>
          <TasteMusicTextarea />
          <CancelLink>Cancel</CancelLink>
          <SaveButton>Save</SaveButton>
        </Wrapper>
      </Main>
    )
  }

  /* To avoid flickering */
  const fallbackFullname = 'xxxx'

  return (
    <Main>
      <HiddenHeadingLevelOne>Edit your profile</HiddenHeadingLevelOne>
      <Wrapper onSubmit={handleSubmit} as="form">
        <ImageWrapper>
          <Avatar>
            <Image
              src={imageSrc}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              objectPosition="top center"
              loading="eager"
              priority
            />
          </Avatar>
          <AvatarUploadHiddenInput
            type="file"
            id="upload"
            accept="image/*"
            aria-label="Upload Avatar"
            onChange={onFileChange}
          />
          <AvatarUploadLabel htmlFor="upload">
            <CloudUpload
              css={{
                heightWidth: '100%',
                path: { '&:hover': { transition: 'all 0.25s ease-out' } },
              }}
            />
          </AvatarUploadLabel>
        </ImageWrapper>
        <Fullname>{user?.fullname || fallbackFullname}</Fullname>
        <TasteMusicLabel htmlFor="tasteOfMusic">Taste of music</TasteMusicLabel>
        <TasteMusicTextarea
          id="tasteOfMusic"
          value={tasteOfMusic}
          name="tasteOfMusic"
          spellCheck="false"
          onChange={(event) => handleChange(event)}
        />
        <Link href={`/profile/${currentAuthUser?.id}`} passHref>
          <CancelLink>Cancel</CancelLink>
        </Link>
        <SaveButton type="submit">Save</SaveButton>
      </Wrapper>
    </Main>
  )
}

export default ProfileEdit
