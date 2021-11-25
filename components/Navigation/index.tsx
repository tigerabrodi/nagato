import { supabase } from '@lib/client'
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
  Dance,
  SignOutButton,
  JoinRoomButton,
  AvatarLink,
  AvatarImage,
  Door,
  ButtonText,
} from './styles'
import toast from 'react-hot-toast'
import {
  DefaultAvatar2x,
  DefaultAvatar3x,
  DefaultAvatar4x,
} from '@theme/shared'

type User =
  | (SupaUser & {
      user_metadata: {
        avatarUrl: string
      }
    })
  | null

export const Navigation = () => {
  const { isAuthenticated } = useUserContext()

  const user = supabase.auth.user() as User

  const imageSrcSet =
    user?.user_metadata.avatarUrl === ''
      ? `${DefaultAvatar2x} 300w, ${DefaultAvatar3x} 768w, ${DefaultAvatar4x} 1280w`
      : undefined

  const signOut = () => {
    supabase.auth.signOut()
    toast.success('You have successfully signed out!')
  }

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
            <JoinRoomButton>
              <ButtonText>Join Room</ButtonText>
              <Dance />
            </JoinRoomButton>
            <SignOutButton onClick={() => signOut()}>
              <ButtonText>Sign Out</ButtonText>
              <Door />
            </SignOutButton>
            <NavLink href={`/profile/${user.id}`}>
              <AvatarLink aria-label="To Profile">
                <AvatarImage
                  src={
                    user.user_metadata.avatarUrl !== ''
                      ? user.user_metadata.avatarUrl
                      : DefaultAvatar2x
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
