describe('Conference page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
  })
  it('displays the latest announcement', () => {
    cy.resetAnnouncement()
    cy.enterConferenceSection()
    cy.queryByText(/This is an announcement!/).should('exist')
  })
  it('can display links in announcement', () => {
    cy.resetAnnouncement()
    cy.enterConferenceSection()
    cy.queryByText('feedback').should('match', 'a[href]')
  })
  it('has a tweet button')
  it('displays schedule', () => {
    cy.enterConferenceSection()
    cy.queryByText('Schedule').should('exist')
  })
  it('updates the announcement in real-time', () => {
    cy.resetAnnouncement()
    cy.enterConferenceSection()
    cy.updateAnnouncement('Networking party will start at 19:00')
    cy.queryByText('Networking party will start at 19:00').should('exist')
  })
})
