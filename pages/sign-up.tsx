import * as React from 'react'
import { toRem } from '@lib/helpers'
import {
  Main,
  Form,
  FormGroup,
  Input,
  Heading,
  SubmitButton,
  EyeClosed,
  EyeOpened,
  ShowPasswordButton,
  PasswordWrapper,
  Wrapper,
  Label,
} from '@theme/sharedFormStyles'
import { useFormState } from 'hooks/useFormState'
import { styled } from 'stitches.config'
import toast from 'react-hot-toast'
import { HiddenText } from '@components/HiddenText'
import { redirectAuthenticatedUsers, supabase } from '@lib/client'
import { useRouter } from 'next/router'
import { User } from '@lib/types'
import { useLoadingStore } from '@components/Spinner/store'
import { GetServerSideProps } from 'next'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return redirectAuthenticatedUsers(context)
}

export const SignUp = () => {
  const router = useRouter()
  const { setStatus } = useLoadingStore()
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const {
    formState: { email, fullname, password },
    handleChange,
  } = useFormState({ fullname: '', email: '', password: '' })

  const isAnyFieldEmpty = !fullname || !email || !password
  const [isEmailError, setIsEmailError] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    if (isAnyFieldEmpty) {
      setStatus('error')
      return toast.error('Please fill out all fields.')
    }

    const isEmailNotMatching = !email.match(EMAIL_REGEX)
    if (isEmailNotMatching) {
      setStatus('error')
      return setIsEmailError(true)
    }

    const { error: signUpError, user } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setStatus('error')
      return toast.error(signUpError.message)
    }

    if (user) {
      const { error: isEmailTakenAlready } = await supabase
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

      if (isEmailTakenAlready) {
        setStatus('error')
        return toast.error('Email is already taken.')
      }

      toast.success(`Congrats ${fullname}, you successfully signed up!`)
      setStatus('success')
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
