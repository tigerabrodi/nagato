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

  // Should be on edit profile page
  cy.findByRole('heading', { level: 1, name: 'Edit Your Profile' }).should(
    'exist'
  )
  cy.findByRole('heading', { level: 2, name: user.fullname }).should('exist')
  cy.findByLabelText('Taste of music')
  cy.findByLabelText('Avatar Upload').should('exist')
  cy.findByRole('img', { name: 'Default Avatar' }).should('exist')
})
