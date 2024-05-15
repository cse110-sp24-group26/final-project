/* SIDEBAR.js */
/* Auxiliary user information */

/* QUERIES loadUserThemePreferences via state/database.js for the initial theme (dark/light) */
/* SAVES saveUserThemePreferences via state/database.js whenever the theme is changed */
	/* whenever the theme is changed, the class of the body root element should change as well, which will change the color of everything */
/* PUBLISHES open_tab event via state/events.js whenever a date is selected via the calendar */
/* SUBSCRIBES to tag_changed even via state/events.js whenever the tag is changed for a date entry so that the calendar can update its contents */


import './calendar/calendar.js'
import './toolbar.js'

class Sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <m-toolbar>
            </m-toolbar>

            <m-calendar>
            </m-calendar>
            
            <div>
                Remaining space
            </div>
        `
    }
}

customElements.define('m-sidebar', Sidebar);
