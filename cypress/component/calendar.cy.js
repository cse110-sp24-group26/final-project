describe('Initial Load Calendar Tests', () => {
    beforeEach(() => {
        //visting the html file
        cy.visit('../../build/src/index.html');
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    it ('Initial Calendar month, years, and days', () => {

    })

    it('Initial selected calendar day', () => {

    })

    it('Selecting a new date', () => {

    })
})

describe('Calendar Navigation/Scrolling Tests', () => {
    beforeEach(() => {
        //visting the html file
        cy.visit('../../build/src/index.html');
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    it('Navigating to previous month nav', () => {

    })

    it('Navigating to next month with nav', () => {

    })

    it('Navigating to previous month with dropdown', () => {

    })

    it('Navigating to next month with dropdown', () => {

    })

    it('Navigating to next month with dropdown', () => {

    })
})

describe('Date Selection Tests', () => {
    beforeEach(() => {
        //visting the html file
        cy.visit('../../build/src/index.html');
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });
    
    it ('Selecting a date in the past', () => {

    })

    it('Selecting a date in the future', () => {

    })

    it('Selecting inactive dates', () => {

    })

    it('Selecting a date and scrolling calendar', () => {

    })
})