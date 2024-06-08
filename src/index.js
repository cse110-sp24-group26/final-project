/* ROOT_COMPONENT.js */
/* The root element of everything, owning the sidebar, search bar, and main editor */

import "./state/database.js"
import "./state/events.js"
import "./editor/editor.js"
import "./sidebar/sidebar.js"
import "./search/search_bar.js"

/**
 * This class contains the entire application
 * 
 * @class 
 * @extends {HTMLElement}
 */
class RootComponent extends HTMLElement {
    /**
     * Renders the main application
     * @return none
     */
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
