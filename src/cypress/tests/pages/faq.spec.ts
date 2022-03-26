describe('Test for faq page', () => {
    beforeEach(() => {
        cy.visit('/faq').as('homePage');
    });
    it('should visit the our-story page', () => {
        cy.location('pathname').should('equal', '/faq');
        cy.get('[data-cy=FAQPageHeading]').should('contain.text', 'The FAQssssssssss');
        cy.get('[data-cy=FAQPage-Question-0]').should(
            'contain.text',
            'Can I create articles for SEWB ?'
        );
        cy.get('[data-cy=FAQPage-Question-0] + p').should(
            'contain.text',
            `Thank you very much, we feel really honoured and humble that you would love to contribute your knowledge to SEWB. While we currently don't have support for external authors at the moment, we're open to discussing and finding a solution that works for both of us.`
        );
        cy.get('[data-cy=FAQPage-Question-1]').should(
            'contain.text',
            'How can I suggest an article ?'
        );
        cy.get('[data-cy=FAQPage-Question-1] + p').should(
            'contain.text',
            `Thank you very much. You can send us your article suggestion through the contact us page or send us an email at sewb.dev@gmail.com with "Article Suggestion" as the subject of the mail.`
        );
        cy.get('[data-cy=FAQPage-Question-2]').should('contain.text', `Why can't I comment ?`);
        cy.get('[data-cy=FAQPage-Question-2] + p').should(
            'contain.text',
            `Commenting is only supported for authenticated users in the blog. Login to the blog and you should be able to comment. If you're still having issues commenting, please reach out to us at sewb.dev@gmail.com with "Commenting Concerns" as subject of the mail and we'd fix it ASAP for you.`
        );
        cy.get('[data-cy=FAQPage-Question-3]').should('contain.text', `How can I contact you ?`);
    });
});
