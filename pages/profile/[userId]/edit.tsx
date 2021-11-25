import * as React from 'react'
import { CloudIcon } from '@icons/Cloud'
import { toRem } from '@lib/helpers'
import {
  focusStyles,
  SROnlyStyles,
  commonButtonActiveStyles,
  fadeInAnimation,
  DefaultAvatar2x,
  DefaultAvatar3x,
  DefaultAvatar4x,
} from '@theme/shared'
import { styled } from 'stitches.config'
import { useRouter } from 'next/router'
import { supabase } from '@lib/client'
import toast from 'react-hot-toast'
import { useFormState } from 'hooks/useFormState'
import { User } from '@lib/types'

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

const Avatar = styled('img', {
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

const CancelButton = styled('button', {
  ...commonButtonStyles,
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
  const [user, setUser] = React.useState<User | null>(null)
  const {
    query: { userId },
    push,
  } = useRouter()

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
    const getAndSetUser = async () => {
      if (user) return
      if (currentAuthUser) {
        const { data: userData } = await supabase
          .from<User>('users')
          .select('userId')
          .match({ userId: currentAuthUser.id })
          .single()
        setUser(userData)
      }
    }
    getAndSetUser()
  }, [user, currentAuthUser])

  React.useEffect(() => {
    if (user) {
      setFormState({
        tasteOfMusic: user.tasteOfMusic,
      })
    }
  }, [user, setFormState])

  const currentAuthUserAvatar = currentAuthUser?.user_metadata.avatarUrl
  const imageSrcSet = `${DefaultAvatar2x} 300w, ${DefaultAvatar3x} 768w, ${DefaultAvatar4x} 1280w`
  const imageAlt =
    currentAuthUserAvatar !== '' && user ? user.fullname : 'Default Avatar'
  const imageSrc =
    currentAuthUserAvatar !== '' ? currentAuthUserAvatar : DefaultAvatar2x

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Main>
      <HiddenHeadingLevelOne>Edit your profile</HiddenHeadingLevelOne>
      <Form onSubmit={handleSubmit}>
        <ImageWrapper>
          <Avatar src={imageSrc} srcSet={imageSrcSet} alt={imageAlt} />
          <AvatarUploadHiddenInput
            type="file"
            id="upload"
            accept="image/x-png,image/gif,image/jpeg"
            aria-label="Upload Recipe Image"
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
        <Fullname>Naruto Uzumaki</Fullname>
        <TasteMusicLabel htmlFor="taste">Taste of music</TasteMusicLabel>
        <TasteMusicTextarea
          id="taste"
          value={tasteOfMusic}
          name="textarea"
          spellCheck="false"
          onChange={(event) => handleChange(event)}
        />
        <CancelButton type="button">Cancel</CancelButton>
        <SaveButton type="submit">Save</SaveButton>
      </Form>
    </Main>
  )
}

export default ProfileEdit
