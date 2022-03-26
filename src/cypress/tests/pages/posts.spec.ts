describe('Test for post page', () => {
    beforeEach(() => {
        cy.visit('/posts/amazing-things-are-happening').as('homePage');
    });
    it('should visit the post page', () => {
        cy.location('pathname').should('equal', '/posts/amazing-things-are-happening');
        cy.get('[data-cy=PostPagePostContentTitle]').should('be.visible');
        cy.get('[data-cy=PostPagePostContentTitle]').should(
            'have.text',
            'Amazing things are happenings'
        );
    });
});
