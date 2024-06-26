/* SIDEBAR.js */
/* Auxiliary user information */

/* QUERIES loadUserThemePreferences via state/database.js for the initial theme (dark/light) */
/* SAVES saveUserThemePreferences via state/database.js whenever the theme is changed */
    /* whenever the theme is changed, the class of the body root element should change as well, which will change the color of everything */
/* PUBLISHES open_tab event via state/events.js whenever a date is selected via the calendar */
/* SUBSCRIBES to tag_changed even via state/events.js whenever the tag is changed for a date entry so that the calendar can update its contents */


import './calendar.js'
import './tags.js'

/**
 * This class contains the sidebar
 * @class 
 * @extends {HTMLElement}
 */
class Sidebar extends HTMLElement {
    /**
     * Renders the sidebar
     */
    connectedCallback() {
        this.innerHTML = `
            <m-calendar>
            </m-calendar>

            <m-tags>
            </m-tags>
        `
    }
}

customElements.define('m-sidebar', Sidebar);
