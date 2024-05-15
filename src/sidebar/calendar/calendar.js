class Calendar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 'calendar'
    }
}

customElements.define('m-calendar', Calendar)
