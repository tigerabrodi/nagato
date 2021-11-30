import * as React from 'react'
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
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { supabase } from '@lib/client'
import { HiddenText } from '@components/HiddenText'
import { useLoadingStore } from '@components/Spinner/store'
import { useRedirectAuthUsers } from 'hooks/useRedirectAuthUsers'

export const SignIn = () => {
  const { authHookStatus } = useRedirectAuthUsers()
  const isLoading = authHookStatus === 'loading' || authHookStatus === 'idle'

  const router = useRouter()
  const { setStatus } = useLoadingStore()
  const [shouldShowPassword, setShouldShowPassword] = React.useState(false)
  const {
    formState: { email, password },
    handleChange,
  } = useFormState({ email: '', password: '' })

  const isAnyFieldEmpty = !email || !password

  const toggleShouldShowPassword = () =>
    setShouldShowPassword(!shouldShowPassword)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')

    if (isAnyFieldEmpty) {
      setStatus('error')
      return toast.error('Please fill out both fields.')
    }

    const { error: signInError } = await supabase.auth.signIn({
      email,
      password,
    })

    if (signInError) {
      setStatus('error')
      return toast.error('Email or password is invalid.')
    }

    toast.success('You have successfully signed in!')
    setStatus('success')
    router.push('/rooms')
  }

  if (isLoading) {
    return (
      <Main>
        <Wrapper />
      </Main>
    )
  }

  return (
    <Main
      css={{
        '@mobileL': { alignItems: 'flex-start' },
        '@tablet': { alignItems: 'center' },
      }}
    >
      <Wrapper
        css={{
          height: 350,
          '@mobileL': { marginTop: 80 },
          '@tablet': { height: 'auto', marginTop: 'revert' },
        }}
      >
        <Heading>Sign In</Heading>
        <Form onSubmit={handleSubmit} noValidate>
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
          </FormGroup>
          <FormGroup css={{ marginTop: 35, '@tablet': { marginTop: 120 } }}>
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
            aria-describedby="sign-in-button-disabled-message"
            css={{ marginTop: 55, '@tablet': { marginTop: 120 } }}
          >
            Sign In
          </SubmitButton>{' '}
          {isAnyFieldEmpty && (
            <HiddenText id="sign-in-button-disabled-message">
              Disabled since all form fields have not been filled.
            </HiddenText>
          )}
        </Form>
      </Wrapper>
    </Main>
  )
}

export default SignIn
