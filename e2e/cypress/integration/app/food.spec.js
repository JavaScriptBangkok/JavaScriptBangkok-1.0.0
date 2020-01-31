describe('Food page - before selecting food', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.enterFoodSection()
    cy.login('test05')
  })
  afterEach(() => {
    cy.logout()
  })
  it('displays a countdown section', () => {
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
  })
  it('should not display your food selection section')
  it('displays lunchtime choices, available slots', () => {
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
  })
  it('opens food stalls modal', () => {

  })
  it('opens restaurant modal', () => {

  })
  it('lets user customize a menu when selecting a choice, if authenticated')
  it('reduces the menu availability after making a selection')
  it('reduces the restaurant capacity after making a selection')
})

describe('Food page - after selecting food', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.enterFoodSection()
    cy.login('test01')
  })
  afterEach(() => {
    cy.logout()
  })

  it('displays a countdown section', () => {
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
  })
  it('displays your food selection section')
  it('should not display lunchtime choices, available slots')
})

describe('Food page - updating food selection', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.enterFoodSection()
    cy.login('test01')
  })
  afterEach(() => {
    cy.logout()
  })
})


// describe('Customization section', () => {
//   it('lets user select a customization option')
//   it('shows availability if menu availability is limited')
//   it('prevents selecting menu if menu is fully booked')
//   it('allows confirming if not fully booked')
//   it('prevents confirming if fully booked')
//   it('allows changing choice')
// })
// describe('Order summary section', () => {
//   it('displays the selected restaurant')
//   it('displays directions to the restaurant')
//   it('displays the selected customizations')
//   it('lets user view the menu should they need to make changes')
//   it('lets user re-customize their selection within timeframe')
//   it('prevents user from changing their selection after timeframe is passed')
// })