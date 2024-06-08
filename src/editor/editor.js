/* EDITOR.js */
/* Houses the main editor */

/* PUBLISHES open_tab via state/event.js whenever a tab of the tab_list has been selected */
/* SUBSCRIBES to open_tab via state/events.js so that whenever a tab is opened, the tab list is updated and the main editor changes its contents */
    /* NOTE: the tab_list both subscribes and publishes open_tab events since other components can also open a tab */
/* PUBLISHES tag_changed via state/events.js whenever the content of a file is changed via the main_editor and after parsing, we realize that the tags for that day have changed */
/* SUBSCRIBES tag_changed via state/events.js since the tab_list may have to update the individual tab views */
/* QUERIES loadEntry via state/database.js whenever the currently selected file has been changed */
/* SAVES saveEntry via state/database.js whenever a file is changed */
/* QUERIES loadUserTabs via state/database.js on startup to get the list of tabs from the previous session */
/* SAVES saveUserTabs via state/database.js whenever the list of openTabs has been changed */

import './main_editor.js'
import './tab_list.js'

/**
 * This class contains the main editor
 * @class 
 * @extends {HTMLElement}
 */
class Editor extends HTMLElement {
    /**
     * Renders the main editor
     * @return none
     */
    connectedCallback() {
        this.innerHTML = `
            <m-tab-list>
            </m-tab-list>
            <m-main-editor>
            </m-main-editor>
        `
    }
}

customElements.define('m-editor', Editor);
