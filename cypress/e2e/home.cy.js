describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
    
  it('Should display the site title, tagline and login button', () => {
    cy.get('h1').should('have.text', 'Ride Ready')
    cy.get('h2').should('have.text', 'Your personal suspension manager')
    cy.get('button').should('have.text', 'Log in with Strava')
  })

  it('Should show an error on a bad url request', () => {
    cy.visit('http://localhost:3000/ergheth')
    cy.get('p').should('have.text', 'Oops, no page exists here. Sending you back to the home page.')
  })
})