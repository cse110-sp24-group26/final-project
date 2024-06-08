//for future reference it is assumed that the date that is initially selected is today's date
describe('Tags Test', () => {
    beforeEach(() => {
        //visting the html file
        cy.visit('../../build/src/index.html'); 
    });

    cy.on('uncaught:exception', (err, runnable) => {
        console.error('An error occurred:', err.message);
        return false;
    });

    //checks if all tags are initially inactive 
    it('inital tag state', () => {
        cy.log("Initial Tag State");

        //constant number of tags 
        const TAGS_COUNT = 6;

        //checking that each tag is inactive up inital start up
        for(let i = 0; i< TAGS_COUNT; i++){
            cy.get(`#tag-${i}`).should('have.class', 'tag-inactive');
        }
        
    });
    
    //renames a tag and checks if its properly updated
    it('tag renaming', async () => {
        cy.log("Tag Renaming");

        //providing a fixed reponse to the subsequent prompt 
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('New Tag Name');
        });

        //right-clicking tag-0
        await cy.get('#tag-0').find('button').rightclick();

        //checking if tag name has been updated
        cy.get('#tag-0').within(() => {
            cy.get('button').should('have.text', 'New Tag Name');
        });

    });

    //toggles to active and checks if its properly updated
    it('tag toggling', async () => {
        cy.log("Tag Toggling");

        //initial click of tag-0 on current date
        await cy.get('#tag-0').find('button').click();

        //checking if tag selection was saved (only tag-0 should be active)
        cy.get('#tag-0').should('have.class', 'tag-active');
    });
    
  })
