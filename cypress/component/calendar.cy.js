describe('Initial Load Calendar Tests', () => {
    beforeEach(() => {
        //visting the html file
        cy.visit('../../build/src/index.html');
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    it ('Initial Calendar month', () => {
        const date = new Date();
        const currentMonth = date.getMonth();

        cy.get('#month').invoke('val').then((monthNum) => {
            expect(monthNum).to.equal(currentMonth.toString());
        });
    })

    it('Initial Calendar year', () => {
        const date = new Date();
        const currentYear = date.getFullYear();

        cy.get('#year').invoke('val').then((value) => {
            cy.log("Selected value is: " + value);
            expect(value).to.equal(currentYear.toString());
        });
    })

    it('Initial current month dates', () => {
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();

        const start = new Date(year, month, 1).getDay();
        const endDate = new Date(year, month + 1, 0).getDate();
        const end = new Date(year, month, endDate).getDay();
        const endDatePrev = new Date(year, month, 0).getDate();
        const expectedItems = [];

        let added = 0;

        for (let i = start; i > 0; i--) {
            expectedItems.push((endDatePrev- i + 1).toString());
            added += 1;
        }

        for (let i = 1; i <= endDate; i++) {
            expectedItems.push(i.toString());
            added += 1;
        }

        for (let i = end; i < 6; i++) {
            expectedItems.push((i - end + 1).toString());
            added += 1;
        }

        cy.get('.dates li').each((item, index) => {
            cy.wrap(item).should('have.text', expectedItems[index]);
        });
    })

    it('Initial currently selected date', () => {
        const todaysDate = new Date().getDate();
        cy.get(`.dates li.${'today'} button.${'selected'}`).should('have.text', todaysDate.toString());
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