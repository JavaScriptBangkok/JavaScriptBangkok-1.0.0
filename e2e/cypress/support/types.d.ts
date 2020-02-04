/// <reference types="Cypress" />
// eslint-disable-next-line
namespace Cypress {
  interface Chainable<Subject = any> extends OurCustomCommands {
    usePrototype(): void
  }
}

interface OurCustomCommands {
  enterConferenceSection(): void
  enterFoodSection(): void
  updateAnnouncement(text: string): void
  login(username: string): void
  ensureLoggedOut(): void
  updateFoodSelectionTimeout(): void
  resetFoodReservationTestEnvironment(): void
}
