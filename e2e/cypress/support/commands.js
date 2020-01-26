// @ts-check
import '@testing-library/cypress/add-commands';

/* eslint no-loop-func: off */

// https://on.cypress.io/custom-commands
const testSettings = { usingPrototype: false };
beforeEach(() => {
  testSettings.usingPrototype = false;
});

/** @type {OurCustomCommands} */
const prototypeCustomCommands = {
  enterConferenceSection() {
    cy.visit('/prototype/conference.html');
  },
  resetAnnouncement() {},
  updateAnnouncement(text) {
    cy.window().then(window => {
      const element = window.document.getElementById('announcement');
      element.textContent = text;
    });
  }
};

/** @type {OurCustomCommands} */
const actualCustomCommands = {
  enterConferenceSection() {
    cy.visit('/');
  },
  resetAnnouncement() {},
  updateAnnouncement() {}
};

for (const key of Object.keys(prototypeCustomCommands)) {
  Cypress.Commands.add(key, (...args) =>
    (testSettings.usingPrototype
      ? prototypeCustomCommands
      : actualCustomCommands)[key](...args)
  );
}

Cypress.Commands.add('usePrototype', () => {
  testSettings.usingPrototype = true;
});
