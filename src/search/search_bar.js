/* SEARCH_BAR.js */
/* Houses code related to the main search bar */

/* QUERIES state/database.js for getting search results */
/* PUBLISHES open_tab event (via state/events.js) once a search result is selected */

class SearchBar extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "Search Bar"
	}
}

customElements.define('m-search-bar', SearchBar);
