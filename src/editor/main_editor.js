
class MainEditor extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <textarea>

            </textarea>
        `
    }
}

customElements.define('m-main-editor', MainEditor);
