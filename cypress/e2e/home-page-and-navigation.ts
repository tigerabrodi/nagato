beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
  cy.visit('/')
})

it('Should show home page, footer, navigation and be accessible', () => {
  cy.findByRole('link', { name: 'Home' }).should(
    'have.attr',
    'aria-current',
    'page'
  )
  cy.findByRole('link', { name: 'Sign In' }).should('exist')
  cy.findByRole('link', { name: 'Sign Up' }).should('exist')

  cy.findByRole('heading', { name: 'Nagato', level: 1 }).should('exist')

  cy.findByRole('heading', {
    name: 'Listen to music with friends.',
    level: 2,
  }).should('exist')

  cy.findByText(
    'A place where you can vibe with others. Create a room and have your friends join the it.'
  ).should('exist')

  cy.findByText(
    'Perfect when studying together, pair programming, chilling or anything else!'
  ).should('exist')

  cy.findByRole('link', { name: 'Tiger Abrodi (opens in a new tab)' }).should(
    'exist'
  )
})
