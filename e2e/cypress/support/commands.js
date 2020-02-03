// @ts-check
import '@testing-library/cypress/add-commands'
import 'cypress-wait-until'

/* eslint no-loop-func: off */

// https://on.cypress.io/custom-commands
/** @type {OurCustomCommands} */
export const actualCustomCommands = {
  enterConferenceSection() {
    cy.visit('/?env=test')
  },
  enterFoodSection() {
    cy.visit('/user/order?env=test')
  },
  updateAnnouncement(message) {
    const method = 'POST'
    const url =
      'https://asia-northeast1-javascriptbangkok-companion.cloudfunctions.net/setTestAnnouncement'
    const body = { text: message }
    cy.request(method, url, body)
  },
  login(username) {
    cy.get('[data-authentication-state="unauthenticated"]', {
      timeout: 20000,
    }).should('be.visible')
    cy.findByText(`Sign in as test user ${username}`, { timeout: 20000 })
      .should('be.visible')
      .click()
    cy.get('[data-authentication-state="authenticated"]', {
      timeout: 20000,
    }).should('be.visible')
  },
  ensureLoggedOut() {
    cy.window().then(async window => {
      await getAppTestCommands(window).logoutFromFirebase()
    })
    cy.get('[data-authentication-state="unauthenticated"]', {
      timeout: 20000,
    }).should('be.visible')
  },
  updateFoodSelectionTimeout(time) {
    const method = 'POST'
    const url =
      'https://asia-northeast1-javascriptbangkok-companion.cloudfunctions.net/tester'
    const body = {
      command: 'setOrderingPeriodEndTime',
      orderingPeriodEndTime: time,
    }
    cy.request(method, url, body)
  },
  resetFoodReservationTestEnvironment() {
    const method = 'POST'
    const url =
      'https://asia-northeast1-javascriptbangkok-companion.cloudfunctions.net/tester'
    const body = {
      command: 'resetFoodReservationTestEnvironment',
    }
    cy.request(method, url, body)
  },
}

for (const key of Object.keys(actualCustomCommands)) {
  Cypress.Commands.add(key, (...args) => actualCustomCommands[key](...args))
}

function getAppTestCommands(window) {
  return window.JSBangkokApp.testCommands
}
