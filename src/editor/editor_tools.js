class EditorTools extends HTMLElement {
    connectedCallback() {
        this.innerHTML = "Editor Tools"
    }
}

customElements.define('m-editor-tools', EditorTools);
