describe('Food page - before selecting food', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.updateFoodSelectionTimeout(Date.now() + 300e3)
    cy.enterFoodSection()
    cy.ensureLoggedOut()
    cy.login('test05')
  })
  it('displays a countdown section', () => {
    cy.findByText('Please select your menu before time limit:').should(
      'be.visible',
    )
    const timer = cy.findByTestId('food-ordering-countdown-timer')
    expect(timer).to.not.equal('00:00:00')
  })
  it('hides your food selection section', () => {
    cy.findByText('Your Food Selection').should('not.be.visible')
    cy.findByTestId('selected-restaurant-title').should('not.be.visible')
  })
  it('displays lunchtime choices, available slots', () => {
    cy.findByText('Restaurant B').should('be.visible')
    cy.findByLabelText('Restaurant B').within(() => {
      cy.findByTestId('restaurant-availability').should('have.text', '35')
    })
  })
  it('opens and closes food selection modal', () => {
    cy.findByLabelText('Restaurant B')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal').should('be.visible')
    cy.findByLabelText('Close modal')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal').should('not.be.visible')
  })
  it('becomes unavailable when the time is up', () => {
    cy.updateFoodSelectionTimeout(Date.now() - 300e3)
    // TODO: not see selected food summary
    // TODO: not see available menu
    // TODO: see contact support message
    cy.findByTestId('food-ordering-countdown-timer').should(
      'have.text',
      '00:00:00',
    )
  })
})

describe('Food page - after selecting food', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.updateFoodSelectionTimeout(Date.now() + 300e3)
    cy.enterFoodSection()
    cy.ensureLoggedOut()
    cy.login('test01')
  })

  it('displays a countdown section', () => {
    cy.findByText('Please select your menu before time limit:').should(
      'be.visible',
    )
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
  it('reduces the restaurant and menu availability after making a selection', () => {
    cy.clickUpdateFoodSelection()
    // check availability
  })
})
