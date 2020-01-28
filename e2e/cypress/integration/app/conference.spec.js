describe('Conference page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
  })
  it('displays the latest announcement', () => {
    cy.updateAnnouncement('First announcement')
    cy.enterConferenceSection()
    cy.waitUntil(() => cy.findByLabelText('Announcement').should('have.text', 'First announcement'))
  })
  it('can display links in announcement', () => {
    cy.updateAnnouncement('This is an announcement! Make sure to give us <a href="#">feedback</a>.')
    cy.enterConferenceSection()
    cy.waitUntil(() => cy.findByText('feedback').should('match', 'a[href]'))
  })
  it('has a tweet button', () => {
    cy.enterConferenceSection()
    cy.waitUntil(() => cy.findByTestId('tweet-button').should('exist'))
  })
  it('displays schedule', () => {
    cy.enterConferenceSection()
    cy.queryByText('Schedule').should('exist')
  })
  it('updates the announcement in real-time', () => {
    cy.updateAnnouncement('This is an announcement! Make sure to give us <a href="#">feedback</a>.')
    cy.waitUntil(() => cy.findByLabelText('Announcement').should('have.text', 'This is an announcement! Make sure to give us feedback.'))
    cy.updateAnnouncement('Networking party will start at 19:00')
    cy.waitUntil(() => cy.findByLabelText('Announcement').should('have.text', 'Networking party will start at 19:00'))
  })
})
