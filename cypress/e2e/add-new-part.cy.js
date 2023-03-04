describe('add-new-part', () => {
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

    cy.get('button[id="dash-add-sus"').click()
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

  it('Should update values when selecting options', () => {
    cy.get('select[name="bikeSelect"]').select("b9082682")
    cy.get('select[name="suspensionSelect"]').select([5])
    cy.get('input[name="lastRebuild"]').type('2023-01-01')

    cy.get('select[name="bikeSelect"]').should('have.value', "b9082682")
    cy.get('select[name="suspensionSelect"]').should('have.value', 5)
    cy.get('input[name="lastRebuild"]').should('have.value', '2023-01-01')
  })
})