describe('Test for our-story page', () => {
    beforeEach(() => {
        cy.visit('/our-story').as('homePage');
    });
    it('should visit the our-story page', () => {
        cy.location('pathname').should('equal', '/our-story');
        cy.get('[data-cy=MarkdownComponent-h1]').should('contain.text', 'Hi');
    });
});
