import { buildUser, narutoTestUser } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/sign-in')
})

it('Should not be able to submit if any fields are empty.', () => {
  const user = buildUser()

  cy.findByLabelText('Email*').type(user.email)

  cy.findByRole('button', { name: 'Sign In' }).click()

  cy.findByText('Please fill out both fields.').should('exist')
})

it('Should not sign in if anything goes wrong such as password', () => {
  const user = buildUser()

  cy.findByLabelText('Email*').type(narutoTestUser.email)
  cy.findByLabelText('Password*').type(user.password)

  cy.findByRole('button', { name: 'Sign In' }).click()

  cy.findByText('Email or password is invalid.').should('exist')
})

it.only('Should be able to login and sign out.', () => {
  cy.findByLabelText('Email*').type(narutoTestUser.email)
  cy.findByLabelText('Password*').type(narutoTestUser.password)

  cy.findByRole('button', { name: 'Sign In' }).click()
  cy.findByRole('status', { name: 'loading' }).should('exist')

  cy.findByText('You have successfully signed in!').should('exist')

  cy.findByRole('heading', { level: 1, name: 'Rooms' }).should('exist')

  cy.findByRole('button', { name: 'Join Room' }).should('exist')
  cy.findByRole('link', { name: 'To Profile' }).should('exist')

  cy.findByRole('button', { name: 'Sign Out' }).click()

  cy.findByText('You have successfully signed out!').should('exist')
  cy.findByRole('heading', { level: 1, name: 'Nagato' }).should('exist')
})
