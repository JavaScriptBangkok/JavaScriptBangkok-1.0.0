describe('Food selection section', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.enterFoodSection()
    cy.login('test01')
  })
  afterEach(() => {
    cy.logout()
  })
  it('displays lunchtime choices, available slots', () => {
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
  })
  it('displays a countdown timer until time is up', () => {
    // cy.waitUntil(() => cy.findByLabelText('').should('exist'))
  })
//   it('becomes unavailable after time is up')
  it('allows choosing 2 food stalls', () => {

  })
  it('allows choosing 1 restaurant', () => {

  })
  it('lets user customize a menu when selecting a choice, if authenticated')
  it('reduces the menu availability after making a selection')
  it('reduces the restaurant capacity after making a selection')
// })
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
})