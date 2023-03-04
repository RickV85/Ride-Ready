describe('dashboard', () => {
  beforeEach(() => {
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
    })
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
    cy.get('button[id="dash-add-sus"').click()
    cy.url().should('eq', 'http://localhost:3000/dashboard/add-new-part')
  })
})