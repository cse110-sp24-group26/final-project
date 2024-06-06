import {publishOpenDateEvent} from '../../src/state/events.js'




// cypress/integration/tab_spec.js
describe('Tab Functionality', () => {
    beforeEach(() => {
         //visting the html file
         cy.visit('../../build/src/index.html');
        // Clear the local storage before each test to start fresh
        cy.clearLocalStorage();
    });


   
    // Quick note: When loading into website, todays date should always be a tab unless closed.


    // Test: Initial tab state when first loaded in
    // Ensures that a tab with today's date is present when the app first loads
    it('Initial tab state when first loaded in', () => {
        // Mock local storage with pre-saved tabs
        const today = new Date().toDateString();


        cy.get('m-tab').should('have.length', 1);
        cy.get('m-tab').should('have.attr', 'date', today);
        cy.get(`m-tab[date="${today}"]`).should('exist')


    });




    // Test: Load saved tabs on startup
    // Verifies that tabs saved in local storage are loaded when the app reloads
    it('should load saved tabs on startup', () => {
        // Mock local storage with pre-saved tabs
        const today = new Date().toDateString();
        const tabs = [today, '2024-06-01', '2024-06-02'];
        localStorage.setItem('user-tabs', JSON.stringify(tabs));
       
        cy.reload();
       
        cy.get('m-tab').should('have.length', tabs.length);
        tabs.forEach((date, index) => {
            cy.get('m-tab').eq(index).should('have.attr', 'date', date);
        });
    });




    // Test: Add a new tab when a date is opened
    // Ensures that opening a new date adds a new tab with that date
    it('should add a new tab when a date is opened', () => {
        const date = new Date('2000-06-04');
       
        // Simulate opening a date
        cy.window().then((win) => {
            win.publishOpenDateEvent(date);
        });
       
        cy.get('m-tab').should('have.length', 2); // todays date and new date
        cy.get(`m-tab[date="${date.toDateString()}"]`).should('exist')
    });




    // Test: Select a tab when clicked
    // Checks that clicking a tab selects it (adds 'selected' class)
    it('should select a tab when clicked', () => {
        const date = new Date('2005-11-03');
       
        // Simulate opening a date
        cy.window().then((win) => {
            win.publishOpenDateEvent(date);
        });


        cy.get(`m-tab[date="${date.toDateString()}"]`).click();
        cy.get(`m-tab[date="${date.toDateString()}"]`).should('have.class', 'selected');
    });


    // Test: Close a tab when the close button is clicked
    // Ensures that clicking the close button on a tab removes it
    it('should close a tab when the close button is clicked', () => {
        const date1 = new Date('2004-06-05');
        const date2 = new Date('2004-06-06');
       
        // Simulate opening dates
        cy.window().then((win) => {
            win.publishOpenDateEvent(date1);
            win.publishOpenDateEvent(date2);
        });




        cy.get('m-tab').should('have.length', 3); /// todays date and 2 new dates
       
        // Close the first tab
        cy.get('m-tab').first().find('.close-button').click();
        cy.get('m-tab').should('have.length', 2);
        cy.get('m-tab').should('have.attr', 'date', date1.toDateString());
    });


    // Test: Clear all tabs
    // Verifies that calling `clearAllSavedTabs` clears all tabs
    it('should clear all tabs when clearAllSavedTabs is called', () => {
        const tabs = ['2024-06-07', '2024-06-08'];
        localStorage.setItem('user-tabs', JSON.stringify(tabs));
       
        cy.reload();
       
        cy.window().then((win) => {
            win.clearAllSavedTabs();
        });
       
        cy.get('m-tab').should('have.length', 0);
    });


    // Test: Prevent duplicate dates from opening new tabs
    // Ensures that opening the same date multiple times does not create duplicate tabs
    it('when a dupilcate date is opened to new tab should be open', () => {
        const date1 = new Date('2024-06-05');
       
        // Simulate opening dates
        cy.window().then((win) => {
            win.publishOpenDateEvent(date1);
            win.publishOpenDateEvent(date1);
            win.publishOpenDateEvent(date1);
        });
       
        cy.get('m-tab').should('have.length', 2); // todays date and new date
    });
    
});