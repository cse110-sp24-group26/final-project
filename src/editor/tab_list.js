class Tab extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			Tab
		`
	}
}


customElements.define('m-tab', Tab);

class TabList extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<m-tab>
			</m-tab>

			<m-tab>
			</m-tab>

			<m-tab>
			</m-tab>
		`
	}
}

customElements.define('m-tab-list', TabList);