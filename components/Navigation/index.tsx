import { supabase } from '@lib/client'
import Image from 'next/image'
import { useUserContext } from '@lib/userContext'
import { NavLink } from './NavLink'
import * as React from 'react'
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
import { DefaultAvatar4x } from '@theme/shared'
import { useGetUserWithId } from 'hooks/useGetUserWithId'

export const Navigation = () => {
  const { isAuthenticated } = useUserContext()
  const currentAuthUser = supabase.auth.user()

  const { user } = useGetUserWithId({
    userId: currentAuthUser?.id,
    selectProperties: 'avatarUrl',
  })

  const signOut = () => {
    supabase.auth.signOut()
    toast.success('You have successfully signed out!')
  }

  const imageSrc =
    user && user.avatarUrl !== '' ? user?.avatarUrl : DefaultAvatar4x

  return (
    <NavigationContainer>
      <LinksWrapper>
        {isAuthenticated && currentAuthUser ? (
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
            <NavLink href={`/profile/${currentAuthUser.id}`}>
              <AvatarLink aria-label="To Profile">
                <AvatarImage>
                  <Image
                    src={imageSrc}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top center"
                    loading="eager"
                  />
                </AvatarImage>
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
