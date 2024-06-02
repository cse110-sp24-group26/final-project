/* SEARCH_BAR.js */
/* Houses code related to the main search bar */

/* QUERIES state/database.js for getting search results */
/* PUBLISHES open_tab event (via state/events.js) once a search result is selected */
import { searchQuery } from '../state/database.js';
import { publishOpenDateEvent } from '../state/events.js';

class SearchBar extends HTMLElement {
    refresh(inputValue) {
        const expandableSelect = document.getElementById('expandable-select');
        const expandableSection = document.getElementById('expandable-section');
        const field = document.getElementById('search-field');
        searchQuery(inputValue, (results) => {
            // this.removeSelected();

            expandableSelect.innerHTML = '';
            this.dates = [];
            this.selectedIndex = 0;
            try {
                results.forEach(([ date, content ]) => {
                    const jsDate = new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10));
                    this.dates.push(jsDate);
                    const option = document.createElement('div');
                    option.textContent = `${date} ${content}`;
                    // bad hack
                    option.addEventListener('mousedown', () => {
                        field.value = '';
                        expandableSection.classList.add('hidden');
                        this.classList.remove('searching');

                        publishOpenDateEvent(jsDate);
                    });
                    expandableSelect.appendChild(option);
                });
            } catch (error) {
                console.error("An error occurred while processing the results and appending options:", error);
            }

            this.addSelected();
        });
    }

    removeSelected() {
        const expandableSelect = document.getElementById('expandable-select');
        if (this.selectedIndex < expandableSelect.children.length && this.selectedIndex >= 0) {
            expandableSelect.children[this.selectedIndex].classList.remove('selected'); 
        }
    }

    addSelected() {
        const expandableSelect = document.getElementById('expandable-select');
        if (this.selectedIndex < expandableSelect.children.length && this.selectedIndex >= 0) {
            expandableSelect.children[this.selectedIndex].classList.add('selected'); 
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <input type="text" id="search-field" placeholder="search"/>
            <div id="expandable-section" class="hidden">
                <div id="expandable-select">
                </div>
            </div>
        `;

        this.dates = [];
        this.selectedIndex = 0;

        const field = document.getElementById('search-field');
        const expandableSection = document.getElementById('expandable-section');

        field.addEventListener('blur', () => {
            field.value = '';
            expandableSection.classList.add('hidden');
            this.classList.remove('searching');
        });

        field.addEventListener('focus', () => {
            this.refresh("");
            expandableSection.classList.remove('hidden');
            this.classList.add('searching');
        });

        field.addEventListener('keydown', (event) => {  
            this.removeSelected();

            if (event.key === "Enter") {
                if (this.dates.length !== 0) {
                    publishOpenDateEvent(this.dates[this.selectedIndex]);
                }
            }
            else if (event.key === "ArrowUp" || (event.key === "Tab" && event.shiftKey)) {
                event.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
            }
            else if (event.key === "ArrowDown" || event.key === "Tab") {
                event.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.dates.length - 1);
            }

            this.addSelected();
        });

        /**
         * Performs dynamic querying to populate the options list as the user types into the input box
         */
        field.addEventListener('input', (event) => {
            this.refresh(event.target.value);
        });
    }
}

customElements.define('m-search-bar', SearchBar);