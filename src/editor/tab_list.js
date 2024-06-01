import {publishOpenDateEvent, subscribeOpenDateEvent} from '../state/events.js'
import { loadUserTabs, saveUserTabs, loadEntry } from '../state/database.js'


// Define a custom element 'm-tab' for individual tabs
class Tab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    // This method is called when the element is added to the DOM
    connectedCallback() {
        this.render();
    }


    // Render the tab element
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .tab-button {
                    /* Add your default button styles here */
                }
                .tab-button.selected {
                    background-color: blue; /* Change this to the desired selected color */
                    color: white;
                }
            </style>


            <button class="tab-button">${this.getAttribute('label')}</button>
        `;


        // Add an event listener to handle tab clicks
        this.shadowRoot.querySelector('.tab-button').addEventListener('click', () => {
            // Publish the open date event with the selected date
            publishOpenDateEvent(new Date(this.getAttribute('date')));
        });
    }


    setSelected(isSelected) {
        const button = this.shadowRoot.querySelector('.tab-button');
        if (isSelected) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    }
}


customElements.define('m-tab', Tab);


// Define a custom element 'm-tab-list' for the list of tabs
class TabList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tabs = [];
    }


    // This method is called when the element is added to the DOM
    connectedCallback() {
        this.render();
        this.loadTabs();


        // Subscribe to the open_date event
        subscribeOpenDateEvent(this, (date) => {
            this.openDate(date);
        });
    }
   
    // Render the tab list element
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


    // Add a new tab to the list
    addTab(date, label) {
        // Check if a tab with the same date already exists
        const existingTab = this.shadowRoot.querySelector(`m-tab[date="${date}"]`);
        if (!existingTab || null ) {
            const tab = document.createElement('m-tab');
            tab.setAttribute('date', date);
            tab.setAttribute('label', label);
            this.shadowRoot.querySelector('.tabs').prepend(tab);
            this.tabs.push(date);
            saveUserTabs(this.tabs); // Save tabs to local storage
        }
    }


    // Handle the event when a date is clicked in the calendar
    openDate(date) {
        const label = new Date(date).toDateString();
        const newDate = new Date(date).toDateString();
        this.addTab(newDate, label);


        this.shadowRoot.querySelectorAll('m-tab').forEach(tab => {
            const isSelected = tab.getAttribute('date') === newDate;
            tab.setSelected(isSelected);
        });

    }


    // Load saved tabs from local storage
    loadTabs() {
        this.tabs = loadUserTabs();
        const tabsContainer = this.shadowRoot.querySelector('.tabs');
        tabsContainer.innerHTML = ''; // Clear existing tabs before loading
   
        this.tabs.forEach(date => {
            // Check if a tab for this date already exists
            const existingTab = this.shadowRoot.querySelector(`m-tab[date="${date}"]`);
            if (!existingTab) {
                // If no tab exists for this date, create and add a new tab
                const label = new Date(date).toDateString();
                const tab = document.createElement('m-tab');
                tab.setAttribute('date', date);
                tab.setAttribute('label', label);
                tabsContainer.prepend(tab);

            }
        });

        this.openDate(new Date());
    }
   
    // Clear all tabs from the list and local storage
    clearAllTabs() {
        this.tabs = [];
        saveUserTabs(this.tabs);
        this.shadowRoot.querySelector('.tabs').innerHTML = '';
    }  
}




customElements.define('m-tab-list', TabList);

// Clear all saved tabs from the local storage, can use in console if needed
window.clearAllSavedTabs = function() {
    const tabList = document.querySelector('m-tab-list');
    if (tabList) {
        tabList.clearAllTabs();
    } else {
        console.error('Tab list element not found');
    }
    console.log("All saved tabs cleared");
};




