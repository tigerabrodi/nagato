import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CloudIcon } from '@icons/Cloud'
import { toRem } from '@lib/helpers'
import {
  focusStyles,
  SROnlyStyles,
  commonButtonActiveStyles,
  fadeInAnimation,
  DefaultAvatar4x,
} from '@theme/shared'
import { styled } from 'stitches.config'
import { useRouter } from 'next/router'
import { supabase } from '@lib/client'
import toast from 'react-hot-toast'
import { useFormState } from 'hooks/useFormState'
import { useHasMounted } from 'hooks/useHasMounted'
import { useLoadingStore } from '@components/Spinner/store'
import { User } from '@lib/types'
import { Spinner } from '@components/Spinner'

const Main = styled('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const HiddenHeadingLevelOne = styled('h1', SROnlyStyles)

const Form = styled('form', {
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

const ImageWrapper = styled('div', {
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

const Avatar = styled('div', {
  animation: fadeInAnimation,
  position: 'relative',
  width: 132,
  height: 123,
  '@tablet': {
    height: 288,
    width: 350,
  },
})

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

const Fullname = styled('h2', {
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

const commonButtonStyles = {
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

const CancelLink = styled('a', {
  ...commonButtonStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gridArea: 'cancel',
  justifySelf: 'start',
})

const SaveButton = styled('button', {
  ...commonButtonStyles,
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
  const [user, setUser] = React.useState<User | null>(null)
  const currentAuthUser = supabase.auth.user()

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

  React.useEffect(() => {
    const getUser = async () => {
      if (user) return
      if (currentAuthUser) {
        const { data: userData } = await supabase
          .from<User>('users')
          .select('avatarUrl, fullname, tasteOfMusic')
          .eq('userId', currentAuthUser.id)
          .single()
        setUser(userData)
      }
    }
    getUser()
  }, [currentAuthUser, user])

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
    push(`/profile/${currentAuthUser!.id}`)
  }

  if (!hasMounted || !user || !currentAuthUser) {
    return (
      <Main>
        <Spinner />
        <Form>
          <ImageWrapper />
          <Fullname>x</Fullname>
          <TasteMusicLabel>Taste of music</TasteMusicLabel>
          <TasteMusicTextarea />
          <CancelLink>Cancel</CancelLink>
          <SaveButton>Save</SaveButton>
        </Form>
      </Main>
    )
  }

  return (
    <Main>
      <HiddenHeadingLevelOne>Edit your profile</HiddenHeadingLevelOne>
      <Form onSubmit={handleSubmit}>
        <ImageWrapper>
          <Avatar>
            <Image
              src={imageSrc}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
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
        <Fullname>{user.fullname}</Fullname>
        <TasteMusicLabel htmlFor="tasteOfMusic">Taste of music</TasteMusicLabel>
        <TasteMusicTextarea
          id="taste"
          value={tasteOfMusic}
          name="tasteOfMusic"
          spellCheck="false"
          onChange={(event) => handleChange(event)}
        />
        <Link href={`/profile/${currentAuthUser.id}`} passHref>
          <CancelLink>Cancel</CancelLink>
        </Link>
        <SaveButton type="submit">Save</SaveButton>
      </Form>
    </Main>
  )
}

export default ProfileEdit
