import {initDB, saveEntry, searchQuery } from '../../src/state/database.js'

describe('Search Bar Test', () => {
    beforeEach(() => {
        cy.visit('../../src/index.html'); 
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    it('dynamic query test', () => {
        cy.log("Dynamic Query Test");
        cy.wrap(initDB()).then(() => {
            return cy.wrap(saveEntry('2024-10-11', "Text Content", ["tag 1", "tag 2"]));
        }).then(() => {
            cy.get('#search-placeholder').should('be.visible').click();
            cy.get('#expandable-input').should('be.visible').type('Text Content');
            cy.get('#expandable-select').find('option').should('have.length', 1)
                .and((options) => {
                    expect(options.first()).to.contain.text('Date: 2024-10-11 - Content: Text Content');
                });
        });
    });
  })