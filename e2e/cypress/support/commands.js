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
    cy.visit('https://92941e14.ngrok.io/user/order?env=test')
  },
  updateAnnouncement(message) {
    const method = 'POST'
    const url = 'https://asia-northeast1-javascriptbangkok-companion.cloudfunctions.net/setTestAnnouncement'
    const body = {"text": message}
    cy.request(method, url, body)
  },
  login(username) {
    cy.waitUntil(() => cy.get('input').should('be.visible'), {timeout: 20000})
    cy.get('input').type('test01')
    cy.findByText('Login').click()
    cy.waitUntil(() => cy.get('input').should('not.exist'), {timeout: 20000})
  },
  logout() {
    cy.waitUntil(() => cy.findByText('Logout').should('be.visible'), {timeout: 20000})
    cy.findByText('Logout').click()
    cy.waitUntil(() => cy.findByText('Logout').should('not.exist'), {timeout: 20000})
  }
}

for (const key of Object.keys(actualCustomCommands)) {
  Cypress.Commands.add(key, (...args) => actualCustomCommands[key](...args))
}
