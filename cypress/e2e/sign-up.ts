import { buildUser } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/sign-up')
})

it('Should be able to sign up', () => {
  const user = buildUser()

  cy.findByLabelText('Full Name*').type(user.fullname)
  cy.findByLabelText('Email*').type(user.email)
  cy.findByLabelText('Password*').type(user.password)

  cy.findByRole('button', { name: 'Sign Up' }).click()

  cy.findByText(
    `Congrats ${user.fullname}, you successfully signed up!`
  ).should('exist')

  // Should be on edit profile page and authenticated
  cy.findByRole('link', { name: 'To Profile' }).should('exist')
  cy.findByRole('heading', { level: 1, name: 'Edit your profile' }).should(
    'exist'
  )
})
