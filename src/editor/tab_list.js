import { loadUserTabs } from '../state/database.js';
import { subscribeOpenDateEvent, publishOpenDateEvent } from '../state/events.js';
import { dateString } from '../util.js';

class Tab extends HTMLElement {
	constructor(date) {
        super();

        this.date = date;
    }

    connectedCallback() {
        const button = document.createElement("button");
        button.className = "tab-button";
        button.textContent = dateString(this.date);

		button.addEventListener('click', () => {
			publishOpenDateEvent(this.date);
        });

        this.appendChild(button);
    }
}
customElements.define('m-tab', Tab);

class TabList extends HTMLElement {
    openDate(date) {
		const index = this.tabs.findIndex((x) => dateString(x) === dateString(date));
		for (const child of this.children) {
			child.className = "";
		};
		if (index === -1) {
			const tab = new Tab(date);
			tab.className = "tab-active";
			this.prepend(tab);
			this.tabs.unshift(date);
		}
		else {
			this.children.item(index).className = "tab-active";
		}
    }

	connectedCallback() {
		this.tabs = loadUserTabs();

		subscribeOpenDateEvent(this, (date) => {
			this.openDate(date)
		});

		this.openDate(new Date());
    }
}

customElements.define('m-tab-list', TabList);

