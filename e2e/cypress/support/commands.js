// @ts-check
import '@testing-library/cypress/add-commands'
import 'cypress-wait-until'

/* eslint no-loop-func: off */

// https://on.cypress.io/custom-commands

/** @type {OurCustomCommands} */
const actualCustomCommands = {
  enterConferenceSection() {
    cy.visit('/?env=test')
  },
  enterFoodSection() {
    cy.visit('/user/order?env=test')
  },
  updateAnnouncement(message) {
    const method = 'POST'
    const url = 'https://asia-northeast1-javascriptbangkok-companion.cloudfunctions.net/setTestAnnouncement'
    const body = {"text": message}
    cy.request(method, url, body)
  },
  login(username) {
    cy.get('button', {timeout:20000}).contains(username).should('be.visible').click()
    cy.findByText('Ordering as', {timeout: 20000}).should('be.visible')
  },
  logout() {
    cy.findByText('Logout', {timeout: 20000}).should('be.visible')
    cy.findByText('Logout').click()
    cy.findByText('Logout', {timeout: 20000}).should('not.be.visible')
  }
}

for (const key of Object.keys(actualCustomCommands)) {
  Cypress.Commands.add(key, (...args) => actualCustomCommands[key](...args))
}
