import { createContext, useContext } from 'react'

export const UserContext = createContext({
  isAuthenticated: undefined as boolean | undefined,
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(`No provider for UserContext given.`)
  }

  return context
}
