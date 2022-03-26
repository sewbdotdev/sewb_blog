export {};

describe('Test for the homepage', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should visit the homepage', () => {
        cy.get('[data-cy=CategoryComponentContainer]').should('be.visible');
    });
});
