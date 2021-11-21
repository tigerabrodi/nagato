import { NavLink } from './NavLink'
import {
  HomeLink,
  NavigationContainer,
  SignInLink,
  SignUpLink,
  LinksWrapper,
} from './styles'

export const Navigation = () => {
  return (
    <NavigationContainer>
      <LinksWrapper>
        <NavLink href="/">
          <HomeLink aria-label="Home">Nagato</HomeLink>
        </NavLink>
        <NavLink href="/sign-in">
          <SignInLink>Sign In</SignInLink>
        </NavLink>
        <NavLink href="/sign-up">
          <SignUpLink>Sign Up</SignUpLink>
        </NavLink>
      </LinksWrapper>
    </NavigationContainer>
  )
}
