describe('add-new-part', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard/add-new-part')
  })

  it('Should display the site title', () => {
    cy.get('h1').should('have.text', 'Ride Ready')
  })

  it('Should show all labels, inputs and buttons', () => {
    cy.get('label[for="bikeSelect"]').should('have.text', 'Which bike is this part on?')
    cy.get('label[for="suspensionSelect"]').should('have.text', 'What is the make and type?')
    cy.get('label[for="lastRebuild"]').should('have.text', 'When was it last rebuilt?')

    cy.get('select[name="bikeSelect"]').should('be.visible')
    cy.get('select[name="suspensionSelect"]').should('be.visible')
    cy.get('input[name="lastRebuild"]').should('be.visible')

    cy.get('button').eq(0).should('have.text', 'Submit')
    cy.get('button').eq(1).should('have.text', 'Back')
  })

  it('Should have matching values when selecting options', () => {
    cy.get('select[name="bikeSelect"]').select([1])
    cy.get('select[name="suspensionSelect"]').select([5])
    cy.get('input[name="lastRebuild"]').type('2023-01-01')

    cy.get('select[name="bikeSelect"]').should('have.value', 0)
    cy.get('select[name="suspensionSelect"]').should('have.value', 5)
    cy.get('input[name="lastRebuild"]').should('have.value', '2023-01-01')
  })
})