class Tags extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            tags
        `
    }
}

customElements.define('m-tags', Tags);
