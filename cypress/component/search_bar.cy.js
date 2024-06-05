import {initDB, saveEntry, searchQuery } from '../../src/state/database.js'

describe('Search Bar Component Test', () => {
    beforeEach(() => {
        cy.visit('../../build/src/index.html'); 
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    it('Search Bar Component Test', () => {
        cy.log("Search Bar Component Test");
        cy.wrap(initDB()).then(() => {
            return cy.wrap(saveEntry('2024-10-11', "Text Content", [0, 1]));
        }).then(() => {
            cy.get('#search-field').should('be.visible').type('Text Content');
            cy.get('#expandable-select').find('div').should('have.length', 1)
                .and((options) => {
                    expect(options.first()).to.contain.text('2024-10-11 "Text Content..."');
                });
            cy.get('#expandable-select').find('div').first().click();

            const newDate = new Date('2024-10-11T00:00:00');

            cy.get('m-tab').should('exist').and('have.attr', 'date', newDate.toDateString());
        });

        cy.wrap(initDB()).then(() => {
            return cy.wrap(saveEntry('2024-10-29', "Text Content", [0, 1]));
        }).then(() => {
            cy.get('#search-field').should('be.visible').type('29');
            cy.get('#expandable-select').find('div').should('have.length', 1)
                .and((options) => {
                    expect(options.first()).to.contain.text('2024-10-29 ');
                });
            cy.get('#expandable-select').find('div').first().click();

            const newDate = new Date('2024-10-29T00:00:00');

            cy.get('m-tab').should('exist').and('have.attr', 'date', newDate.toDateString());
        });

        cy.wrap(initDB()).then(() => {
            return cy.wrap(saveEntry('2024-10-6', "Text Content", [0, 2]));
        }).then(() => {
            cy.get('#search-field').should('be.visible').type('Tag 3');
            cy.get('#expandable-select').find('div').should('have.length', 1)
                .and((options) => {
                    expect(options.first()).to.contain.text('2024-10-6 [tag] Tag 3');
                });
            cy.get('#expandable-select').find('div').first().click();

            const newDate = new Date('2024-10-06T00:00:00');

            cy.get('m-tab').should('exist').and('have.attr', 'date', newDate.toDateString());
        });
    });
});