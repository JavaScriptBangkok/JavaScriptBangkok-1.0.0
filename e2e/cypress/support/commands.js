// @ts-check
import '@testing-library/cypress/add-commands'

/* eslint no-loop-func: off */

// https://on.cypress.io/custom-commands

/** @type {OurCustomCommands} */
const actualCustomCommands = {
  enterConferenceSection() {
    cy.visit('/')
  },
  resetAnnouncement() {},
  updateAnnouncement() {},
}

for (const key of Object.keys(actualCustomCommands)) {
  Cypress.Commands.add(key, (...args) => actualCustomCommands[key](...args))
}
