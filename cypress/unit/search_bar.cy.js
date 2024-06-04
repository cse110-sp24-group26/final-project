import {initDB, saveEntry, searchQuery } from '../../src/state/database.js'

describe('Search Bar Test', () => {
    beforeEach(() => {
        cy.visit('../../build/src/index.html'); 
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    it('dynamic query test', () => {
        cy.log("Dynamic Query Test");
        cy.wrap(initDB()).then(() => {
            return cy.wrap(saveEntry('2024-10-11', "Text Content", [0, 1]));
        }).then(() => {
            cy.get('#search-field').should('be.visible').type('Text Content');
            cy.get('#expandable-select').find('div').should('have.length', 1)
                .and((options) => {
                    expect(options.first()).to.contain.text('2024-10-11 "Text Content..."');
                });
        });
    });
  })
