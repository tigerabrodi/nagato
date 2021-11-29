import { narutoTestUser } from '../support/generate'

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/sign-in')
})

it('Create room, leave and join via rooms page, paste ID into join dialog and join room.', () => {
  // Sign in as naruto
  cy.findByLabelText('Email*').type(narutoTestUser.email)
  cy.findByLabelText('Password*').type(narutoTestUser.password)
  cy.findByRole('button', { name: 'Sign In' }).click()

  // Create a room
  cy.findByRole('button', { name: 'Create Room' }).click()
  cy.findByRole('dialog', { name: 'Create Room' }).within(() => {
    cy.findByLabelText('Title').type(narutoTestUser.roomTitle)
    cy.findByLabelText('Type of music').type(narutoTestUser.roomTypeOfMusic)
    cy.findByRole('button', { name: 'Create' }).click()
  })

  // Assert the initial room detail page
  cy.findByText(
    `Room ${narutoTestUser.roomTitle} have successfully been created! ID of room has been copied to clipboard!`
  ).should('exist')

  cy.findByRole('heading', { level: 1, name: narutoTestUser.roomTitle }).should(
    'exist'
  )
  cy.findByText(narutoTestUser.roomTypeOfMusic).should('exist')
  cy.findByRole('link', { name: `By ${narutoTestUser.fullname}` }).should(
    'exist'
  )
  cy.findByRole('img', { name: narutoTestUser.fullname }).should('exist')

  cy.findByRole('heading', { level: 2, name: 'Participants' }).should('exist')

  cy.findByText('Currently no song is being played.').should('exist')

  // Authorized buttons should be visible
  cy.findByRole('button', { name: 'Search' }).should('exist')
  cy.findByRole('button', { name: 'Delete' }).should('exist')

  cy.findByRole('button', { name: 'Copy ID' }).should('exist')

  // Go to the rooms page
  cy.findByRole('link', { name: 'To Rooms' }).click()

  // Find the room as item to join
  cy.findByRole('heading', { level: 2, name: narutoTestUser.roomTitle }).should(
    'exist'
  )
  cy.findByText(narutoTestUser.roomTypeOfMusic).should('exist')
  cy.findByRole('link', { name: `By ${narutoTestUser.fullname}` }).should(
    'exist'
  )

  // Join the room
  cy.findByRole('link', {
    name: `Join room ${narutoTestUser.roomTitle}`,
  }).click()

  // Should be in room
  cy.findByRole('heading', { level: 1, name: narutoTestUser.roomTitle }).should(
    'exist'
  )

  // Copy ID to clipboard
  cy.findByRole('button', { name: 'Copy ID' }).click()
  cy.findByText('ID of room has been copied to clipboard!').should('exist')

  // Go to rooms page
  cy.findByRole('link', { name: 'To Rooms' }).click()

  // Join the room via dialog
  cy.findByRole('button', { name: 'Join Room' }).click()
  cy.findByRole('dialog', { name: 'Join Room' }).within(() => {
    cy.findByLabelText('Room ID').trigger('paste')
    cy.findByRole('button', { name: 'Join' }).click()
  })

  // Toast to appear when joining a room
  cy.findByText(
    `You successfully joined the room ${narutoTestUser.roomTitle}!`
  ).should('exist')

  // Delete the room
  cy.findByRole('button', { name: 'Delete' }).click()
  cy.findByText(`Room ${narutoTestUser.roomTitle} was deleted!`).should('exist')

  // Should be on rooms page
  cy.findByRole('heading', { level: 1, name: 'Rooms' }).should('exist')
})