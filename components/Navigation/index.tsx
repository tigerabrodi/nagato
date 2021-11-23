import { supabase } from '@lib/client'
import { styled } from 'stitches.config'
import { useUserContext } from '@lib/userContext'
import { NavLink } from './NavLink'
import { User as SupaUser } from '@supabase/gotrue-js'
import {
  HomeLink,
  NavigationContainer,
  SignInLink,
  SignUpLink,
  LinksWrapper,
  DoubleMusicalNote,
} from './styles'

const DEFAULT_AVATAR = '/public/assets/DefaultAvatar'
const JPG_EXTENSION = '.jpg'

const AvatarLink = styled('a', {})

const AvatarImage = styled('img', {})

type User = SupaUser & {
  user_metadata: {
    avatarUrl: string
  }
}

export const Navigation = () => {
  const { isAuthenticated } = useUserContext()

  const user = supabase.auth.user() as User

  const imageSrcSet =
    user.user_metadata.avatarUrl === ''
      ? `${DEFAULT_AVATAR}2x${JPG_EXTENSION} 300w, ${DEFAULT_AVATAR}3x${JPG_EXTENSION} 768w, ${DEFAULT_AVATAR}4x${JPG_EXTENSION} 1280w`
      : undefined

  return (
    <NavigationContainer>
      <LinksWrapper>
        {isAuthenticated && user ? (
          <>
            <NavLink href="/rooms">
              <HomeLink aria-label="To Rooms">
                Nagato
                <DoubleMusicalNote />
              </HomeLink>
            </NavLink>
            <NavLink href={`/profile/${user.id}`}>
              <AvatarLink aria-label="To Profile">
                <AvatarImage
                  src={
                    user.user_metadata.avatarUrl !== ''
                      ? user.user_metadata.avatarUrl
                      : `${DEFAULT_AVATAR}2x${JPG_EXTENSION}`
                  }
                  srcSet={imageSrcSet}
                  alt=""
                />
              </AvatarLink>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink href="/">
              <HomeLink aria-label="To Landing Page">
                Nagato
                <DoubleMusicalNote />
              </HomeLink>
            </NavLink>
            <NavLink href="/sign-in">
              <SignInLink>Sign In</SignInLink>
            </NavLink>
            <NavLink href="/sign-up">
              <SignUpLink>Sign Up</SignUpLink>
            </NavLink>
          </>
        )}
      </LinksWrapper>
    </NavigationContainer>
  )
}
