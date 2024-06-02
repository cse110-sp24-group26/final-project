/* SEARCH_BAR.js */
/* Houses code related to the main search bar */

/* QUERIES state/database.js for getting search results */
/* PUBLISHES open_tab event (via state/events.js) once a search result is selected */
import { searchQuery } from '../state/database.js';

class SearchBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="select-container">
                <input type="text" id="search-placeholder" placeholder="Search Workbook..." readonly />
                <div id="expandable-section" class="hidden">
                    <input type="text" id="expandable-input" placeholder="Type to search..." />
                    <select id="expandable-select" size="5">
                    </select>
                </div>
            </div>
        `;

        const placeholderInput = this.querySelector('#search-placeholder');
        const expandableSection = this.querySelector('#expandable-section');
        const expandableInput = this.querySelector('#expandable-input');
        const expandableSelect = this.querySelector('#expandable-select');

        /**
         * When the search field is clicked, the placeholder textbox is hidden and dropdown expands
         */
        placeholderInput.addEventListener('click', () => {
            placeholderInput.classList.add('hidden');
            expandableSection.classList.remove('hidden');
            expandableInput.style.fontSize = '24px';
            expandableSection.style.fontSize = '24px';
            expandableInput.focus();
        });

        /**
         * When the user selects an option, fills the search box with the date for that entry
        */
        expandableSelect.addEventListener('change', () => {
            placeholderInput.value = expandableSelect.value;
            placeholderInput.classList.remove('hidden');
            expandableSection.classList.add('hidden');
        });

        /**
         * When the user clicks off the input text box, the dropdown closes and reverts back to the default search box
         */
        expandableInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (!document.activeElement.closest('#expandable-section')) {
                    placeholderInput.classList.remove('hidden');
                    expandableSection.classList.add('hidden');
                }
            }, 100);
        });

        /**
         * Performs dynamic querying to populate the options list as the user types into the input box
         */
        expandableInput.addEventListener('input', function(event){
            const inputValue = event.target.value;
            searchQuery(inputValue, (results) => {
                console.log("Search results:", results);
                expandableSelect.innerHTML = '';
                try {
                    results.forEach(({date, content}) => {
                        const option = document.createElement('option');
                        option.value = date;
                        option.textContent = `Date: ${date} - Content: ${content.length > 30 ? content.substring(0, 30) + '...' : content}`;
                        expandableSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error("An error occurred while processing the results and appending options:", error);
                }
            });
        });

        /**
         * When the user clicks off the options list, the dropdown closes and reverts back to the default search box
         */
        expandableSelect.addEventListener('blur', () => {
            setTimeout(() => {
                if (!document.activeElement.closest('#expandable-section')) {
                    placeholderInput.classList.remove('hidden');
                    expandableSection.classList.add('hidden');
                }
            }, 100);
        });
    }
}

customElements.define('m-search-bar', SearchBar);