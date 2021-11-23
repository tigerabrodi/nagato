import * as React from 'react'
import { toRem } from '@lib/helpers'
import { useFormState } from 'hooks/useFormState'
import { styled } from 'stitches.config'
import toast from 'react-hot-toast'
import { HiddenText } from '@components/HiddenText'
import { EyeClosedIcon } from '@icons/EyeClosed'
import { EyeOpenedIcon } from '@icons/EyeOpened'
import { supabase } from '@lib/client'
import { useRouter } from 'next/router'
import { useRedirectAuthUsers } from 'hooks/useRedirectAuthUsers'
import { User } from '@lib/types'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const Main = styled('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '80%',
  backgroundColor: '$secondary',
  paddingY: 12,
  paddingX: 16,
  boxShadow: '$shadowElevationMedium',
  '@mobileM': {
    height: 440,
  },
  '@tablet': {
    width: '80%',
    maxWidth: '1200px',
    height: 'auto',
    padding: '20px 100px 40px 100px',
  },
  '@laptop': {
    paddingX: 200,
  },
  '@desktop': {
    paddingX: 300,
  },
})

const Heading = styled('h1', {
  fontWeight: '$bold',
  fontSize: '$mobileHeading',
  color: '$primary',
  '@tablet': {
    fontSize: '$desktopHeading',
  },
})

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '100%',
})

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginTop: 15,
  width: '100%',
  '&:first-of-type': {
    marginTop: 22,
  },
  '@tablet': {
    marginTop: 40,
    '&:first-of-type': {
      marginTop: 50,
    },
  },
})

const Label = styled('label', {
  fontSize: toRem(16),
  fontWeight: '$medium',
  color: '$primary',
  '@tablet': {
    fontSize: toRem(27),
  },
})

const Input = styled('input', {
  width: '100%',
  height: 30,
  color: '$tertiary',
  backgroundColor: '$primary',
  paddingLeft: 10,
  marginTop: 10,
  fontWeight: '$medium',
  fontSize: toRem(14),
  transition: 'box-shadow 0.1s',
  '&:focus': {
    boxShadow: '0 1px 3px black',
  },
  '@tablet': {
    height: 50,
    fontSize: toRem(22),
    paddingLeft: 15,
    marginTop: 20,
  },
})

const EmailErrorMessage = styled('span', {
  fontSize: toRem(11),
  color: '$primary',
  fontWeight: '$medium',
  marginTop: 8,
  '@tablet': {
    marginTop: 16,
    fontSize: toRem(17),
  },
})

const SubmitButton = styled('button', {
  width: '100%',
  height: 38,
  fontSize: toRem(20),
  fontWeight: '$semiBold',
  backgroundColor: '$primary',
  color: '$secondary',
  marginTop: 40,
  boxShadow: '$shadowElevationLow',
  '@mobileM': {
    marginTop: 65,
  },
  '@tablet': {
    maxWidth: 320,
    height: 70,
    fontSize: 36,
    marginTop: 100,
    boxShadow: '0 1px 3px black',
    transition: 'all 0.3s ease-out',
    '&:hover': {
      transition: 'all 0.15s ease-out',
      transform: 'translateY(-3px)',
      boxShadow: '0 2px 6px black',
    },
    '&:active': {
      transition: 'all 0.1s ease-out',
      transform: 'translateY(0) scale(0.99)',
      boxShadow: '0 1px 3px black',
    },
  },
})

const PasswordWrapper = styled('div')

const ShowPasswordButton = styled('button', {
  position: 'absolute',
  right: 0,
  bottom: 0,
  lineHeight: 0,
  '@tablet': {
    '&:hover': {
      path: {
        fill: '$tertiary',
      },
    },
  },
})

const pathStyles = {
  path: {
    transition: 'fill 0.2s ease-out',
  },
}

const EyeClosed = styled(EyeClosedIcon, {
  width: 20,
  height: 19,
  '@tablet': {
    width: 32,
    height: 31,
    ...pathStyles,
  },
})

const EyeOpened = styled(EyeOpenedIcon, {
  width: 20,
  height: 13,
  '@tablet': {
    width: 32,
    height: 21,
    ...pathStyles,
  },
})

export const SignUp = () => {
  useRedirectAuthUsers()
  const router = useRouter()
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const {
    formState: { email, fullname, password },
    handleChange,
  } = useFormState({ fullname: '', email: '', password: '' })
  const isAnyFieldEmpty = !fullname || !email || !password

  const [isEmailError, setIsEmailError] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isAnyFieldEmpty) {
      return toast.error('Please fill out all fields.')
    }

    if (!email.match(EMAIL_REGEX)) {
      return setIsEmailError(true)
    }

    const { error, user } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: {
          avatarUrl: '',
        },
      }
    )

    if (error) return toast.error(error.message)

    if (user) {
      const { error } = await supabase
        .from('users')
        .insert([
          {
            fullname,
            email,
            userId: user.id,
            avatarUrl: '',
            roomId: '',
            tasteOfMusic: '',
          } as User,
        ])
        .single()

      if (error) return toast.error('Email is already taken.')

      toast.success(`Congrats ${fullname}, you successfully signed up!`)
      router.push(`/profile/${user.id}/edit`)
    }
  }

  const toggleShouldShowPassword = () =>
    setShouldShowPassword(!shouldShowPassword)

  return (
    <Main>
      <Wrapper>
        <Heading>Sign Up</Heading>
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="fullname">Full Name*</Label>
            <Input
              id="fullname"
              type="text"
              aria-required="true"
              placeholder="Naruto Uzumaki"
              onChange={(event) => handleChange(event)}
              name="fullname"
              value={fullname}
              autoComplete="new-password"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              type="email"
              aria-required="true"
              placeholder="naruto@gmail.com"
              onChange={(event) => handleChange(event)}
              name="email"
              value={email}
              autoComplete="new-password"
            />
            {isEmailError && (
              <EmailErrorMessage role="alert">
                Please enter a valid email.
              </EmailErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password*</Label>
            <PasswordWrapper css={{ position: 'relative', width: '100%' }}>
              <Input
                onChange={(event) => handleChange(event)}
                id="password"
                type={shouldShowPassword ? 'text' : 'password'}
                aria-required="true"
                name="password"
                value={password}
                autoComplete="new-password"
              />
              <ShowPasswordButton
                aria-pressed={shouldShowPassword}
                aria-label="Show password as plain text. Note: this will visually expose your password on the screen."
                onClick={() => toggleShouldShowPassword()}
                type="button"
                css={{
                  transform: shouldShowPassword
                    ? 'translate(-13px, -4.5px)'
                    : 'translate(-13px, -8px)',
                  '@tablet': {
                    transform: shouldShowPassword
                      ? 'translate(-22px, -8.5px)'
                      : 'translate(-22px, -13px)',
                  },
                }}
              >
                {shouldShowPassword ? <EyeClosed /> : <EyeOpened />}
              </ShowPasswordButton>
            </PasswordWrapper>
          </FormGroup>
          <SubmitButton
            type="submit"
            aria-disabled={isAnyFieldEmpty}
            aria-describedby="sign-up-button-disabled-message"
          >
            Sign Up
          </SubmitButton>{' '}
          {isAnyFieldEmpty && (
            <HiddenText id="sign-up-button-disabled-message">
              Disabled since all form fields have not been filled.
            </HiddenText>
          )}
        </Form>
      </Wrapper>
    </Main>
  )
}

export default SignUp
