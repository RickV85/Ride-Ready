describe('Login', () => {

  // This testing is very difficult with OAuth2.0
  // I am using Cypress env vars and a test Strava account to login
  // Running this spec a few times will cause Strava to block login

  beforeEach(() => {
    cy.visit(`http://www.strava.com/oauth/authorize?client_id=${Cypress.env('CLIENT_ID')}&response_type=code&redirect_uri=http://localhost:3000/redirect/exchange_token&approval_prompt=auto&scope=activity:read_all`)
  })
  
  it("Should direct to the Strava login page", () => {
    cy.url().should('eq', 'https://www.strava.com/login')
  })

  it("Should allow a user to log in and land on the redirect page", () => {
    cy.get('input[name=email]').type('rvermeil22@turing.edu')
    cy.get('input[name=password]').type('n<e?M@idI!EBUsPb1f0=')
    cy.get('button[id="login-button"]').click()

    cy.url().should('eq', 'https://www.strava.com/oauth/authorize?client_id=102662&response_type=code&redirect_uri=http://localhost:3000/redirect/exchange_token&approval_prompt=auto&scope=activity:read_all')

    cy.get('button[id="authorize"]').click()
    cy.wait(10000)
    cy.url().should('eq', 'http://localhost:3000/dashboard')
  })

})