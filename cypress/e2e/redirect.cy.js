import '../fixtures/rideData.json'

describe('Redirect', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/redirect')
  })

  it('Should display site title, gif and message', () => {
    cy.get('h1').should('have.text', 'Ride Ready')
    cy.get('img[class="loading-gif"]').should('be.visible')
    cy.get('p[class="loading-message"]').should('be.visible')
  })

  it('Should fetch rides and gear then redirect to /dashboard once loaded', () => {
    cy.visit('http://localhost:3000/redirect/exchange_token?state=&code=97dd82f961714a09adb14e47b242a23103c4c202&scope=read,activity:read_all')
    cy.intercept('POST', `https://www.strava.com/oauth/token`, {
      statusCode: 200,
      body: {
        access_token: 'accessToken'
      }
    })

    cy.intercept('GET',`https://www.strava.com/api/v3/athlete/activities?page=1&per_page=200`, {
      fixture: 'RideData.json'
    })

    cy.intercept('GET',`https://www.strava.com/api/v3/gear/b9082682`, {
      fixture: 'EnduroData.json'
    })

    cy.intercept('GET',`https://www.strava.com/api/v3/gear/b1979857`, {
      fixture: 'AllezData.json'
    }
    )

    cy.url().should('eq', 'http://localhost:3000/dashboard')
  })
})