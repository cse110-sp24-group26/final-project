describe('Markdown Editor Tests', () => {
    beforeEach(() => {
        cy.visit('../../build/src/index.html');
    });

    it('Text Saved In Each Entry', () => {
        cy.get('#text-editor').type('hello!');
        cy.reload();
        cy.get('#text-editor').should('contain', 'hello!');
    });

    it('Apply Markdown Formatting To Selected Text', () => {
        cy.get('#text-editor').type('# Heading\n**Bold**\n_Italics_');
        //finds the descendent DOM elements for each span class formatting from main_editor.js
        cy.get('#text-editor').find('span.editor-bold').should('contain', 'Bold');
        cy.get('#text-editor').find('span.editor-italic').should('contain', 'Italics');
        cy.get('#text-editor').find('span.editor-heading').should('contain', 'Heading');
    });
})
