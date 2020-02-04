beforeEach(() => {
  cy.viewport('iphone-6')
  cy.resetFoodReservationTestEnvironment()
})
describe('Food page - before selecting food', () => {
  beforeEach(() => {
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
  it('does not display your food selection section', () => {
    cy.findByText('Your Food Selection').should('not.be.visible')
    cy.findByTestId('selected-restaurant-title').should('not.be.visible')
  })
  it('displays lunchtime choices along with available slots', () => {
    cy.findByText('Restaurant B').should('be.visible')
    cy.findByText('Restaurant B')
      .closest('[data-testid="restaurant-item"]')
      .within(() => {
        cy.findByTestId('restaurant-availability').should('have.text', '35')
      })
  })
  it('opens and closes food selection modal', () => {
    cy.findByText('Restaurant B')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal').should('be.visible')
    cy.findByLabelText('Close modal')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal').should('not.be.visible')
  })
  it.skip('displays menu availability', () => {
    cy.findByText('Choose 2 from our food stalls')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal').should('be.visible')
    assertMenuAvailability('Menu A', 99)
    assertMenuAvailability('Menu B', 1)
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
    cy.enterFoodSection()
    cy.ensureLoggedOut()
    cy.login('test01')
  })
  it('displays your food selection section', () => {
    cy.findByText('Your Food Selection').should('be.visible')
    cy.findByLabelText('Your Food Selection').within(() => {
      cy.findByText('Choose 2 from our food stalls').should('be.visible')
      cy.findByText('Menu A').should('be.visible')
      cy.findByText('Menu B').should('be.visible')
    })
  })
  it.skip('hides lunchtime choices, available slots', () => {
    cy.findByTestId('restaurant-title').should('not.be.visible')
    cy.findByTestId('restaurant-availability').should('not.be.visible')
  })
  it('prevents updating when the time is up', () => {
    cy.updateFoodSelectionTimeout(Date.now() - 300e3)
    cy.findByTestId('food-ordering-countdown-timer').should(
      'have.text',
      '00:00:00',
    )
  })
})

describe('Food page - making a food selection', () => {
  beforeEach(() => {
    cy.enterFoodSection()
    cy.ensureLoggedOut()
    cy.login('test05')
  })
  it('reduces the restaurant availability after making a selection', () => {
    assertRestaurantAvailability('Restaurant B', 35)
    cy.findByText('Restaurant B')
      .should('be.visible')
      .click()
    cy.findByText('Menu J')
      .should('be.visible')
      .click()
    cy.findByText('Soft drink')
      .should('be.visible')
      .click()
    cy.findByText('Confirm')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal', { timeout: 20000 }).should(
      'not.be.visible',
    )
    assertRestaurantAvailability('Restaurant B', 34)
  })
  it('updates the menu availability after making a selection')
})

describe('Food page - updating a food selection', () => {
  beforeEach(() => {
    cy.enterFoodSection()
    cy.ensureLoggedOut()
    cy.login('test01')
  })
  it('updates restaurant availability accordingly', () => {
    assertRestaurantAvailability('Restaurant C', 1)
    assertRestaurantAvailability('Choose 2 from our food stalls', 199)
    cy.findByText('Restaurant C')
      .should('be.visible')
      .click()
    cy.findByText('Menu M')
      .should('be.visible')
      .click()
    cy.findByText('Soft drink')
      .should('be.visible')
      .click()
    cy.findByText('Confirm')
      .should('be.visible')
      .click()
    cy.findByLabelText('Customize your meal', { timeout: 20000 }).should(
      'not.be.visible',
    )
    assertRestaurantAvailability('Restaurant C', 0)
    assertRestaurantAvailability('Choose 2 from our food stalls', 200)
  })
  it('updates the menu availability accordingly')
})

function assertRestaurantAvailability(restaurantName, availability) {
  cy.findAllByText(restaurantName)
    .closest('[data-testid="restaurant-item"]')
    .within(() => {
      cy.findByTestId('restaurant-availability').should(
        'have.text',
        String(availability),
      )
    })
}

function assertMenuAvailability(menuName, availability) {
  cy.findAllByText(menuName)
    .closest('[data-testid="restaurant-item"]')
    .within(() => {
      cy.findByTestId('restaurant-availability').should(
        'have.text',
        String(availability),
      )
    })
}
