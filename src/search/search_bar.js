/* SEARCH_BAR.js */
/* Houses code related to the main search bar */

/* QUERIES state/database.js for getting search results */
/* PUBLISHES open_tab event (via state/events.js) once a search result is selected */

class SearchBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="select-container">
                <input type="text" id="search-placeholder" placeholder="Search" readonly />
                <div id="expandable-section" class="hidden">
                    <input type="text" id="expandable-input" placeholder="Type to search..." />
                    <select id="expandable-select" size="5">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                        <option value="option5">Option 5</option>
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