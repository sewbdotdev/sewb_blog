describe('Test for our page', () => {
    beforeEach(() => {
        cy.visit('/our-story').as('homePage');
    });
    it.only('should visit the our-story page', () => {
        cy.location('pathname').should('equal', '/our-story');
        cy.get('[data-cy=MarkdownComponent-h1]').should('contain.text', 'Hi');
        cy.get('[data-cy=OurStoryPageStoryContainer]').then((item) => expect(item));
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
    it.skip('should visit the author profile page', () => {
        cy.get('[data-cy=ArticlePreviewComponentContainer]').should('be.visible');
        cy.get('[data-cy=ArticlePreviewComponentArticlePreviewName]').first().click();
        cy.location('pathname').should('eq', '/profile?id=1');
    });
});
