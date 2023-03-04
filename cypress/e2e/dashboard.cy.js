describe('dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard')
  })

  it('Should display the site title', () => {
    cy.get('h1').should('have.text', 'Ride Ready')
  })

  it('Should have a a "add suspension" message', () => {
    cy.get('p[class="add-new-mesg"]').should('be.visible')
  })

  it('Should have a button to add suspension', () => {
    cy.get('button').should('have.text', 'Add new suspension')
  })

  it('Should direct you to the AddNewPartForm on button click', () => {
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/dashboard/add-new-part')
  })
})