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
  updateAnnouncement(message) {
    const method = 'POST'
    const url = 'https://asia-northeast1-javascriptbangkok-companion.cloudfunctions.net/setTestAnnouncement'
    const body = {"text": message}
    cy.request(method, url, body)
  },
}

for (const key of Object.keys(actualCustomCommands)) {
  Cypress.Commands.add(key, (...args) => actualCustomCommands[key](...args))
}
