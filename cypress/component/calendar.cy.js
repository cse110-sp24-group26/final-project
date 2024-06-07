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

    it('Checking correct month and year with next nav', () => {
        let date = new Date();
        let nextMonth = (date.getMonth() + 1) % 12;
        let year = date.getFullYear();

        if (nextMonth === 0) {
            year += 1;
        }

        cy.get('#next').click();
        
        cy.get('#month').invoke('val').then((monthNum) => {
            expect(monthNum).to.equal(nextMonth.toString());
        });

        cy.get('#year').invoke('val').then((yearNum) => {
            expect(yearNum).to.equal(year.toString());
        });
    })

    it('Checking correct month and year with prev nav', () => {
        let date = new Date();
        let prevMonth = (date.getMonth() - 1);
        let year = date.getFullYear();

        if (prevMonth === -1) {
            year -= 1;
            prevMonth = 11
        }

        cy.get('#prev').click();

        cy.get('#month').invoke('val').then((monthNum) => {
            expect(monthNum).to.equal(prevMonth.toString());
        });

        cy.get('#year').invoke('val').then((yearNum) => {
            expect(yearNum).to.equal(year.toString());
        });
    })
})