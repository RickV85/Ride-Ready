describe('Login', () => {

  beforeEach(() => {
    cy.visit(`http://www.strava.com/oauth/authorize?client_id=${Cypress.env('CLIENT_ID')}&response_type=code&redirect_uri=http://localhost:3000/redirect/exchange_token&approval_prompt=auto&scope=activity:read_all`)
  })
  
  it("Should direct to the Strava login page", () => {
    cy.url().should('eq', 'https://www.strava.com/login')
  })
})