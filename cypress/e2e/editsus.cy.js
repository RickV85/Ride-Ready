describe('EditSus', () => {
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

    cy.intercept('GET',`https://www.strava.com/api/v3/athlete/activities?page=*`, {
      fixture: 'RideData.json'
    })

    cy.intercept('GET',`https://www.strava.com/api/v3/gear/b9082682`, {
      fixture: 'EnduroData.json'
    })

    cy.intercept('GET',`https://www.strava.com/api/v3/gear/b1979857`, {
      fixture: 'AllezData.json'
    })

    cy.get('button[id="dash-add-sus"').click()

    cy.wait(200)
    cy.get('select[name="bikeSelect"]').select(1)
    cy.wait(200)
    cy.get('select[name="suspensionSelect"]').select('RockShox Fork')
    cy.wait(200)
    cy.get('input[name="lastRebuild"]').type('2023-01-01')
    cy.wait(200)
    cy.get('button').eq(0).click()

    cy.wait(200)

    cy.get('h2').should('have.text', 'RockShox Fork')
    cy.get('h3').eq(0).should('have.text', 'on your Specialized Enduro')
    cy.get('p').should('have.text', 'Last serviced: Jan 1, 2023')
  })
})