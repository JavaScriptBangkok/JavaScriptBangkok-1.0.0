describe('Food page - before selecting food', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.updateFoodSelectionTimeout(Date.now() + 300e3)
    cy.enterFoodSection()
    cy.login('test05')
  })
  afterEach(() => {
    cy.logout()
  })
  it('displays a countdown section', () => {
    cy.findByText('Please select your menu before time limit:').should('be.visible')
  })
  it('hides your food selection section', () => {
    cy.findByText('Your Food Selection').should('not.be.visible')
  })
  it('displays lunchtime choices, available slots', () => {
    cy.findByLabelText('Restaurant title').should('be.visible')
    // cy.findByLabelText('').should('be.visible')
  })
  it('opens and closes food selection modal', () => {
    cy.findByLabelText('Restaurant title').should('be.visible').click()
    // cy.findByLabelText('').should('be.visible')
    // cy.findByLabelText('').should('be.visible').click()
    // cy.findByLabelText('').should('not.be.visible')
  })
  it('becomes unavailable when the time is up', () => {
    cy.updateFoodSelectionTimeout(Date.now() - 300e3)
    // not see only selected food summary
    // see contact support message
  })
})

describe('Food page - after selecting food', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.updateFoodSelectionTimeout(Date.now() + 300e3)
    cy.enterFoodSection()
    cy.login('test01')
  })
  afterEach(() => {
    cy.logout()
  })

  it('displays a countdown section', () => {
    cy.findByText('Please select your menu before time limit:').should('be.visible')
  })
  it('displays your food selection section', () => {
    cy.findByText('Your Food Selection').should('be.visible')
  })
  it('hides lunchtime choices, available slots', () => {
    cy.findByLabelText('Restaurant title').should('not.be.visible')
    // cy.findByLabelText('').should('not.be.visible')
  })
  it('becomes unavailable when the time is up', () => {
    cy.updateFoodSelectionTimeout(Date.now() - 300e3)
    // see only selected food summary
    // not see change food button
  })
})

describe('Food page - updating food selection', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.updateFoodSelectionTimeout(Date.now() + 300e3)
    cy.enterFoodSection()
    cy.login('test01')
  })
  afterEach(() => {
    cy.logout()
  })
  it('reduces the restaurant and menu availability after making a selection', () => {
    cy.clickUpdateFoodSelection()
    // check availability
  })
})