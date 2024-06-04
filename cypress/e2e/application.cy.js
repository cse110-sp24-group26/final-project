function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Overall Test', () => {
	it('basic search test', () => {
		cy.visit('../../build/src/index.html');
		const editor = cy.get('#text-editor');
		editor.type("Text Query");

		const search = cy.get('m-search-bar').find('#search-field');
		search.type("Text ** \n# hello _italic_ ** bold __");
		sleep(100);
		search.type('{enter}');
		search.type('{downArrow}');
		search.type('{upArrow}');

		cy.get('.selected').should('exist');

		cy.reload();
	});

	it('open date test', () => {
		cy.visit('../../build/src/index.html');

		const first = cy.get("#1");
		first.click();
		const second = cy.get("#2");
		second.click();

		let childrenCount;
		cy.get('.tabs').children().then(children => {
			childrenCount = children.length;
			expect(childrenCount).to.be.greaterThan(2);
		});
		
		const select = cy.get('.tab-button').first();
		select.click();

		const close = cy.get(".close-button").first();
		close.click();

		cy.get('.tabs').children().then(children => {
			expect(children.length).to.equal(childrenCount - 1);
		});

	});

	it('change tag test', () => {
		cy.visit('../../build/src/index.html');
		const tag = cy.get('#tag-0').find('button');
		tag.click();
	});
})
