import { buildUser, narutoTestUser } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/sign-up')
})

it('Should should be accessible', () => {
  const user = buildUser()

  // Assert heading level 1
  cy.findByRole('heading', { name: 'Sign Up', level: 1 }).should('exist')

  // Inputs should have aria-required
  cy.findByLabelText('Full Name*').should('have.attr', 'aria-required', 'true')
  cy.findByLabelText('Email*').should('have.attr', 'aria-required', 'true')
  cy.findByLabelText('Password*').should('have.attr', 'aria-required', 'true')

  // Button should have aria-disabled and aria-describedby since all fields have to be filled
  cy.findByRole('button', { name: 'Sign Up' })
    .should('have.attr', 'aria-disabled', 'true')
    .should('have.attr', 'aria-describedby', 'sign-up-button-disabled-message')

  cy.get('#sign-up-button-disabled-message').should(
    'have.text',
    'Disabled since all form fields have not been filled.'
  )

  // Fill in all form fields
  cy.findByLabelText('Full Name*').type(user.fullname)
  cy.findByLabelText('Email*').type(user.email)
  cy.findByLabelText('Password*').type(user.password)

  // Description should be removed and button should be enabled
  cy.get('#sign-up-button-disabled-message').should('not.exist')
  cy.findByRole('button', { name: 'Sign Up' }).should(
    'have.attr',
    'aria-disabled',
    'false'
  )

  // Password should be hidden by default
  cy.findByLabelText('Password*').should('have.attr', 'type', 'password')
  cy.findByRole('button', {
    name: 'Show password as plain text. Note: this will visually expose your password on the screen.',
  })
    .should('have.attr', 'aria-pressed', 'false')
    .click()

  // Password should be visible
  cy.findByLabelText('Password*').should('have.attr', 'type', 'text')
  cy.findByRole('button', {
    name: 'Show password as plain text. Note: this will visually expose your password on the screen.',
  }).should('have.attr', 'aria-pressed', 'true')
})

it('Should show error toast when trying to submit any empty fields.', () => {
  const user = buildUser()

  cy.findByLabelText('Full Name*').type(user.fullname)
  cy.findByRole('button', { name: 'Sign Up' }).click()

  cy.findByText('Please fill out all fields.').should('exist')
})

it('Should display error message if email is not a valid email.', () => {
  const user = buildUser()

  cy.findByLabelText('Full Name*').type(user.fullname)
  cy.findByLabelText('Password*').type(user.fullname)
  cy.findByLabelText('Email*').type('vlah')

  cy.findByRole('button', { name: 'Sign Up' }).click()

  cy.findByText('Please enter a valid email.').should('exist')
})

it('Should not be able to sign up with an existing email.', () => {
  cy.findByLabelText('Full Name*').type(narutoTestUser.fullname)
  cy.findByLabelText('Password*').type(narutoTestUser.password)
  cy.findByLabelText('Email*').type(narutoTestUser.email)

  cy.findByRole('button', { name: 'Sign Up' }).click()

  cy.findByText('Email is already taken.').should('exist')
})
