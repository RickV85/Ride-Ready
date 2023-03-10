import '../fixtures/rideData.json'

describe('Redirect', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/redirect')
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
    })
  })

  it('Should display site title, gif and message', () => {
    cy.get('h1').should('have.text', 'Ride Ready')
    cy.get('img[class="loading-gif"]').should('be.visible')
    cy.get('p[class="loading-message"]').should('be.visible')
  })

  it('Should fetch rides and gear then redirect to /dashboard once loaded', () => {
    cy.visit('http://localhost:3000/redirect/exchange_token?state=&code=97dd82f961714a09adb14e47b242a23103c4c202&scope=read,activity:read_all')

    cy.url().should('eq', 'http://localhost:3000/dashboard')
  })

  it('Should display the user an error when get auth token request fails', () => {
    cy.visit('http://localhost:3000/redirect/exchange_token?state=&code=97dd82f961714a09adb14e47b242a23103c4c202&scope=read,activity:read_all')

    cy.intercept('POST', `https://www.strava.com/oauth/token`, {
      statusCode: 500,
      body:'Server error on auth token request.'
    })

    cy.url().should('eq', 'http://localhost:3000/error')

    cy.get('p').should('contain', 'An error occurred')
    cy.get('p').should('contain', 'while requesting an access token')
  })

  it('Should display the user an error when get user activities request fails', () => {
    cy.visit('http://localhost:3000/redirect/exchange_token?state=&code=97dd82f961714a09adb14e47b242a23103c4c202&scope=read,activity:read_all')

    cy.intercept('GET',`https://www.strava.com/api/v3/athlete/activities?page=1&per_page=200`, {
      statusCode: 500,
      body:'Server error on ride request.'
    })

    cy.url().should('eq', 'http://localhost:3000/error')

    cy.get('p').should('contain', 'An error occurred')
    cy.get('p').should('contain', 'while fetching your rides')
  })

  it('Should display the user an error when get user activities request fails', () => {
    cy.visit('http://localhost:3000/redirect/exchange_token?state=&code=97dd82f961714a09adb14e47b242a23103c4c202&scope=read,activity:read_all')

    cy.intercept('GET',`https://www.strava.com/api/v3/gear/b1979857`, {
      statusCode: 500,
      body: 'Server error on user gear request.'
    })

    cy.url().should('eq', 'http://localhost:3000/error')

    cy.get('p').should('contain', 'An error occurred')
    cy.get('p').should('contain', 'while fetching your bike details')
  })

  it('Should navigate to home page after 7 seconds', () => {
    cy.visit('http://localhost:3000/redirect/exchange_token?state=&code=97dd82f961714a09adb14e47b242a23103c4c202&scope=read,activity:read_all')

    cy.intercept('POST', `https://www.strava.com/oauth/token`, {
      statusCode: 500,
      body:'Server error on auth token request.'
    })

    cy.wait(7500)

    cy.url().should('eq', 'http://localhost:3000/')
  })
})