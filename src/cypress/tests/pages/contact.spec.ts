describe('Test for contact page', () => {
    beforeEach(() => {
        cy.visit('/contact').as('homePage');
    });
    it('should visit the our-story page', () => {
        cy.location('pathname').should('equal', '/contact');
        cy.get('[data-cy=FAQPageHeading]').should('contain.text', 'Wanna talk to us?');
        cy.get('[data-cy=FAQPageHeading] + p').should(
            'contain.text',
            'The best way to reach us is through the following channels'
        );
    });
});
