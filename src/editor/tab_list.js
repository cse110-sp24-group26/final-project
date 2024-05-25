class Tab extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <button class="tab-button">${this.getAttribute('label')}</button>
        `;

        this.shadowRoot.querySelector('.tab-button').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('tab-selected', { detail: { date: this.getAttribute('date') } }));
        });
    }
}


customElements.define('m-tab', Tab);

class TabList extends HTMLElement {
	constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tabs = [];
    }
	connectedCallback() {
        this.render();
    }
	
	render() {
		this.shadowRoot.innerHTML = `
			<style>
                .tabs {
                    display: flex;
                    flex-direction: row;
                }
            </style>

			<div class="tabs"></div>
		`
	}

	addTab(date, label) {
        const tab = document.createElement('m-tab');
        tab.setAttribute('date', date);
        tab.setAttribute('label', label);
        this.shadowRoot.querySelector('.tabs').appendChild(tab);
    }
}

customElements.define('m-tab-list', TabList);



// Add test tab after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    testAddTab();
});


/// When tab selected change color for the selected one only


/// Close tab feature


// Event listener for when calendar day is clicked to create tab


//tabbable? 


/// tag colors on tab (low priority)


/// Testing 

// Function to test adding a tab
function testAddTab() {
    const tabList = document.querySelector('m-tab-list');

    if (tabList) {
        const date = '2024-05-18';
        const label = 'May 18, 2024';
        tabList.addTab(date, label);
		tabList.addTab(date, label);
        const date2 = '2024-05-18';
        const labe2 = 'long messages and what not to see how it works';
        tabList.addTab(date2, labe2);
    } else {
        console.error('Tab list element not found');
    }
};