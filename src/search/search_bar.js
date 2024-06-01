/* SEARCH_BAR.js */
/* Houses code related to the main search bar */

/* QUERIES state/database.js for getting search results */
/* PUBLISHES open_tab event (via state/events.js) once a search result is selected */
import { searchQuery } from '../state/database.js';

class SearchBar extends HTMLElement {
    connectedCallback() {
        //saveEntry('2024-10-11', "Text Content", ["tag 1", "tag 2"]);

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

        placeholderInput.addEventListener('click', () => {
            placeholderInput.classList.add('hidden');
            expandableSection.classList.remove('hidden');
            expandableInput.style.fontSize = '24px';
            expandableSection.style.fontSize = '24px';
            expandableInput.focus();
        });

        expandableInput.addEventListener('input', function() {
            const options = expandableSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value.toLowerCase().includes(this.value.toLowerCase())) {
                    options[i].style.display = 'block';
                } else {
                    options[i].style.display = 'none';
                }
            }
        });

        expandableSelect.addEventListener('change', () => {
            placeholderInput.value = expandableSelect.value;
            placeholderInput.classList.remove('hidden');
            expandableSection.classList.add('hidden');
        });

        expandableInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (!document.activeElement.closest('#expandable-section')) {
                    placeholderInput.classList.remove('hidden');
                    expandableSection.classList.add('hidden');
                }
            }, 100);
        });

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
                    // Optionally, you can display an error message to the user or take other actions
                }
            });
        });

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