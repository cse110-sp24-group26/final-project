/* ROOT_COMPONENT.js */
/* The root element of everything, owning the sidebar, search bar, and main editor */

import "./editor/editor.js"
import "./sidebar/sidebar.js"
import "./search/search_bar.js"

class RootComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <m-sidebar>
                </m-sidebar>
                <div id='main-content'>
                    <m-search-bar>
                    </m-search-bar>
                    <m-editor>
                    </m-editor>
                </div>
            </main>
        `
    }
}

customElements.define('m-root-component', RootComponent);
