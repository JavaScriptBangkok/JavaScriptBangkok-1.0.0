// @ts-check
import '@testing-library/cypress/add-commands'
import 'cypress-wait-until'

/* eslint no-loop-func: off */

// https://on.cypress.io/custom-commands

/** @type {OurCustomCommands} */
const actualCustomCommands = {
  enterConferenceSection() {
    cy.visit('/')
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
    cy.get('input', { timeout: 20000 }).should('be.visible')
    cy.get('input').type('test01')
    cy.findByText('Login').click()
    cy.get('input', { timeout: 20000 }).should('not.be.visible')
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
