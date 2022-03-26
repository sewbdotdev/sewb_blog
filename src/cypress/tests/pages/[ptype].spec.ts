describe('Test for category page', () => {
    beforeEach(() => {
        cy.visit('/category/system-design').as('homePage');
    });
    it('should visit the category page', () => {
        cy.location('pathname').should('equal', '/category/system-design');
        cy.get('[data-cy=PtypePageContentTitle]').should('be.visible');
        cy.get('[data-cy=PtypePageContentTitle]').should('have.text', 'System Design');
    });
});
describe('Test for tag page', () => {
    beforeEach(() => {
        cy.visit('/tag/system-design').as('homePage');
    });
    it('should visit the tag page', () => {
        cy.location('pathname').should('equal', '/tag/system-design');
        cy.get('[data-cy=PtypePageContentTitle]').should('have.text', 'System Design');
    });
});
