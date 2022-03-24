// tslint:disable-next-line:no-namespace
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Create several Todo items via UI
         * @example
         * cy.createDefaultTodos()
         */
        //   login(): Chainable<any>;
        /**
         * Creates one Todo using UI
         * @example
         * cy.createTodo('new item')
         */
    }
}
