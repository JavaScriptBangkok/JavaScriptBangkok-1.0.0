/// <reference types="Cypress" />
// eslint-disable-next-line
namespace Cypress {
  interface Chainable<Subject = any> extends OurCustomCommands {
    usePrototype(): void;
  }
}
interface OurCustomCommands {
  enterConferenceSection(): void;
  resetAnnouncement(): void;
  updateAnnouncement(text: string): void;
}
