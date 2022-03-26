describe('Test for the homepage', () => {
    beforeEach(() => {
        cy.visit('/').as('homePage');
    });
    it('should visit the homepage', () => {
        cy.location('pathname').should('equal', '/');
        cy.get('[data-cy=CategoryComponentHeading]').should('be.visible');
        cy.get('[data-cy=HomePagecontentSection]').should('be.visible');
        cy.get('[data-cy=HomePagecontentSection]').children().should('have.length.greaterThan', 0);
    });
    it('should visit the cateogry page', () => {
        cy.get('[data-cy=CategoryComponentHeading]').should('be.visible');
        cy.get('[data-cy=CategoryCardComponentContainer] > a').first().click();
        cy.location('pathname').should('eq', '/category/system-design');
    });
    it('should visit the tag page', () => {
        cy.get('[data-cy=ArticlePreviewComponentContainer]').should('be.visible');
        cy.get('[data-cy=TagComponentContainer]').first().click();
        cy.location('pathname').should('eq', '/tag/system-design');
    });
    it('should visit the post page', () => {
        cy.get('[data-cy=ArticlePreviewComponentContainer]').should('be.visible');
        cy.get('[data-cy=ArticlePreviewComponentArticlePreviewTitle]').first().click();
        cy.location('pathname').should('eq', '/posts/amazing-things-are-happening');
    });

    // TODO Fix this failing test
    it('should visit the author profile page', () => {
        cy.get('[data-cy=ArticlePreviewComponentContainer]').should('be.visible');
        cy.get('[data-cy=ArticlePreviewComponentArticlePreviewNameLink]').first().click();
        cy.location('pathname').should('eq', '/profile');
        cy.get('[data-cy=ProfilePageContainer]').should('be.visible');
    });
});
