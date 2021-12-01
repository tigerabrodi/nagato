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
  SignOutButton,
  AvatarLink,
  AvatarImage,
  Door,
  ButtonText,
} from './styles'
import toast from 'react-hot-toast'
import { DefaultAvatar4x } from '@theme/shared'
import { useGetUserWithId } from 'hooks/useGetUserWithId'
import { JoinRoomDialog } from '@components/JoinRoomDialog'

export const Navigation = () => {
  const { isAuthenticated } = useUserContext()
  const currentAuthUser = supabase.auth.user()
  const joinRoomDialogRef = React.useRef<HTMLDivElement>(null)

  const { user, setUser } = useGetUserWithId({
    userId: currentAuthUser?.id,
    selectProperties: 'avatarUrl',
  })

  React.useEffect(() => {
    const userOnUpdateSubscription = supabase
      .from(`users:userId=eq.${currentAuthUser?.id}`)
      .on('UPDATE', (payload) => {
        setUser(payload.new)
      })
      .subscribe()

    return () => {
      supabase.removeSubscription(userOnUpdateSubscription)
    }
  }, [currentAuthUser?.id, setUser])

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
            <JoinRoomDialog dialogRef={joinRoomDialogRef} />
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
