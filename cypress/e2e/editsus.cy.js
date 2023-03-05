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
  })

  it('Should navigate to the edit view when clicking the edit button on a tile', () => {
    cy.get('button').eq(0).click()
    cy.url().should('eq', 'http://localhost:3000/dashboard/edit')
  })

  it('Should not allow a submission if the date field has not been modified', () => {
    cy.get('button').eq(0).click()

    cy.get('button').eq(0).click()

    cy.get('p[class="error-wait-message"]').should('be.visible')

    cy.url().should('eq', 'http://localhost:3000/dashboard/edit')
  })

  it('Should navigate to the dashboard on new date entry', () => {
    cy.get('button').eq(0).click()

    cy.get('input').type('2022-10-10')
    cy.get('button').eq(0).click()

    cy.url().should('eq', 'http://localhost:3000/dashboard')
  })

  it('Should update the last rebuild date shown on the selected tile', () => {
    cy.get('button').eq(0).click()

    cy.get('input').type('2022-10-10')
    cy.get('button').eq(0).click()

    cy.get('p').eq(0).should('have.text', 'Last serviced: Oct 10, 2022')
  })
})