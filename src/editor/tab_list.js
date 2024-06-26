/*
 * File: tab_list.js
 * Description: Implementation of the tabs and tab list
 * Author: Angel Chavez, Suhaib Chowdhury, Santiago Duque
 */
import {publishOpenDateEvent, subscribeOpenDateEvent} from '../state/events.js'
import { loadUserTabs, saveUserTabs, loadEntry } from '../state/database.js'


/**
 * Custom tab class that represents a tab within the list
 * 
 * @class 
 * @extends {HTMLElement}
 */
class Tab extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Initializes and renders the tab
     */
    connectedCallback() {
        this.render();
    }

    /**
     * Renders the tab. Adds buttons, text, and event listeners.
     * @return none
     */
    render() {
        // Create a close button and append it to the tab
        this.close = document.createElement('button');
        this.close.classList.add('close-button');
        this.close.innerHTML = '&times;';
        this.appendChild(this.close);
        // Create a tab button and append it to the tab
        this.button = document.createElement('button');
        this.button.classList.add('tab-button');
        this.button.innerHTML = this.getAttribute('label');
        this.appendChild(this.button);
        // Add an event listener to handle tab clicks
        this.addEventListener('click', () => {
            // Publish the open date event with the selected date
            publishOpenDateEvent(new Date(this.getAttribute('date')));
        });
        // Add an event listener to handle the close button click
        this.close.onclick = (event) => {
            event.stopPropagation(); // Prevent the event from bubbling up
            this.remove(); // Remove the tab element
            const tabList = document.querySelector('m-tab-list'); // Get the tab list
            const tabs = document.querySelector('m-tab-list .tabs'); // Get the tabs container
            const index = tabList.tabs.indexOf(this.getAttribute('date')); // Get the index of the current tab
            tabList.tabs = tabList.tabs.filter(date => date !== this.getAttribute('date')); // Remove the current tab from the tabs array
            saveUserTabs(tabList.tabs); // Save the updated tabs array
            // If the current tab is selected, select the previous tab or the next tab
            if (this.classList.contains("selected")) {
                publishOpenDateEvent(new Date(tabs.children[Math.min(tabList.tabs.length - 1, index)].getAttribute('date')));
            }
        };
    }

    /**
     * If isSelected, then makes the tab selected. Otherwise unselects the tab
     * @param {boolean} isSelected
     * @return none 
     */
    setSelected(isSelected) {
        if (isSelected) {
            this.classList.add('selected');
        } else {
            this.classList.remove('selected');
        }
    }
}

customElements.define('m-tab', Tab);

/**
 * This class handles the creation and management of tabs
 * @class 
 * @extends {HTMLElement}
 */
class TabList extends HTMLElement {
    /**
     * Constructs an empty tab list
     */
    constructor() {
        super();
        this.tabs = [];
    }


    /**
     * Initializes the list and adds tabs. Also subscribes to the open date event
     */
    connectedCallback() {
        this.innerHTML = `
            <div class="tabs"></div>
        `
        
        this.loadTabs();

        // Subscribe to the open_date event
        subscribeOpenDateEvent(this, (date) => {
            this.openDate(date);
        });
    }
   
    /**
     * Formats date and returns it as a string.
     * @param {Date} date 
     * @returns The formatted date
     */
    formatLabel(date) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    /**
     * Adds a new tab corresponding to date if it is not already in the list also saves the tab 
     * list.
     * @param {Date} date 
     * @param {String} label label of the tab
     */
    addTab(date, label) {
        // Check if a tab with the same date already exists
        const existingTab = document.querySelector(`m-tab[date="${date}"]`);
        if (!existingTab || null ) {
            const tab = document.createElement('m-tab');
            tab.setAttribute('date', date);
            
            tab.setAttribute('label', this.formatLabel(label));
            document.querySelector('.tabs').prepend(tab);
            this.tabs.unshift(date);
            saveUserTabs(this.tabs); // Save tabs to local storage
        }
    }

    /**
     * Opens a new tab for the date
     * @param {Date} date 
     */
    openDate(date) {
        const label = new Date(date);
        const newDate = new Date(date).toDateString();
        this.addTab(newDate, label);

        document.querySelectorAll('m-tab').forEach(tab => {
            const isSelected = tab.getAttribute('date') === newDate;
            tab.setSelected(isSelected);
        });
    }

    /**
     * Loads saved tabs from localStorage and replaces any existing tabs
     * @return none
     */
    loadTabs() {
        this.tabs = loadUserTabs();
        const tabsContainer = document.querySelector('.tabs');
        tabsContainer.innerHTML = ''; // Clear existing tabs before loading
   
        this.tabs.forEach(date => {
            // Check if a tab for this date already exists
            const existingTab = document.querySelector(`m-tab[date="${date}"]`);
            if (!existingTab) {
                // If no tab exists for this date, create and add a new tab
                const label = new Date(date);
                const tab = document.createElement('m-tab');
                tab.setAttribute('date', date);
                tab.setAttribute('label', this.formatLabel(label));
                tabsContainer.append(tab);
            }
        });

        this.openDate(new Date());
    }
   
    /**
     * Saves all tabs and clears the list.
     * @return none
     */
    clearAllTabs() {
        this.tabs = [];
        saveUserTabs(this.tabs);
        document.querySelector('.tabs').innerHTML = '';
    }  
}
customElements.define('m-tab-list', TabList);

/**
 * Clears all saved tabs from local storage.
 * @return none
 */
window.clearAllSavedTabs = function() {
    const tabList = document.querySelector('m-tab-list');
    if (tabList) {
        tabList.clearAllTabs();
    } 
};