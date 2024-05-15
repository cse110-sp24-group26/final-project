class Toolbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            toolbar
        `
    }
}

customElements.define('m-toolbar', Toolbar);
