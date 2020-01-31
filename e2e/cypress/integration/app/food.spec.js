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
    const timer = cy.findByTestId('food-ordering-countdown-timer')
    expect(timer).to.not.equal('00:00:00')
  })
  it('hides your food selection section', () => {
    cy.findByText('Your Food Selection').should('not.be.visible')
    cy.findByTestId('selected-restaurant-title').should('not.be.visible')
  })
  it('displays lunchtime choices, available slots', () => {
    cy.findByTestId('restaurant-title').should('be.visible')
    cy.findByTestId('restaurant-availability').should('be.visible')
  })
  it('opens and closes food selection modal', () => {
    cy.findByLabelText('Restaurant title').should('be.visible').click()
    cy.findByTestId('food-customization-modal').should('be.visible')
    cy.findByLabelText('Close modal').should('be.visible').click()
    cy.findByTestId('food-customization-modal').should('not.be.visible')
  })
  it('becomes unavailable when the time is up', () => {
    cy.updateFoodSelectionTimeout(Date.now() - 300e3)
    // not see only selected food summary
    // see contact support message
    const timer = cy.findByTestId('food-ordering-countdown-timer')
    expect(timer).to.equal('00:00:00')
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
    const timer = cy.findByTestId('food-ordering-countdown-timer')
    expect(timer).to.not.equal('00:00:00')
  })
  it('displays your food selection section', () => {
    cy.findByText('Your Food Selection').should('be.visible')
    cy.findByTestId('selected-restaurant-title').should('be.visible')
  })
  it('hides lunchtime choices, available slots', () => {
    cy.findByTestId('restaurant-title').should('not.be.visible')
    cy.findByTestId('restaurant-availability').should('not.be.visible')
  })
  it('becomes unavailable when the time is up', () => {
    cy.updateFoodSelectionTimeout(Date.now() - 300e3)
    // see only selected food summary
    // not see change food button
    const timer = cy.findByTestId('food-ordering-countdown-timer')
    expect(timer).to.equal('00:00:00')
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