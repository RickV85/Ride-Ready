describe('Redirect', () => {
  beforeEach(() => {
    cy.visit('https://www.strava.com/oauth/authorize?state=&code=5a2992dba1725717bee2103eb0884e6de92d716e&scope=read,activity:read_all')
    cy.intercept('POST', `https://www.strava.com/oauth/token`, {
      statusCode: 201,
      body: {
        response: 'AccessTokenRequestStubbed'
      }
    })
  })

  it('Should stub', () => {
    
  })

})