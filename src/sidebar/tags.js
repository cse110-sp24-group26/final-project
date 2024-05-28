import { dateString } from '../util.js';
import { loadEntry, saveEntry, loadUserTags, saveUserTags } from '../state/database.js';
import { publishTagChangedEvent, subscribeOpenDateEvent } from '../state/events.js';

const NUM_TAGS = 6;

class Tag extends HTMLElement {
	// callback is the function that should be called whenever this state is toggled
	constructor(index, tagNames, toggleCallback) {
		super();
		this.index = index;
		this.tagNames = tagNames;
		this.toggleCallback = toggleCallback;
	}

	connectedCallback() {
		this.id = 'tag-' + this.index;

		const button = document.createElement("button");
		button.textContent = this.tagNames[this.index];
		button.addEventListener('dblclick', () =>{
            const newText = prompt("Enter the new text for the tag:");
			if (newText !== null) {
				this.tagNames[this.index] = newText;
				button.textContent = newText;
				saveUserTags(this.tagNames);
			}
        });

        button.addEventListener('click', () => {
			if (this.className === "tag-inactive") {
				this.className = "tag-active";
			}
			else {
				this.className = "tag-inactive";
			}

			this.toggleCallback();
        });

		this.appendChild(button);
	}
}

customElements.define('m-tag', Tag);

class Tags extends HTMLElement {

	tagsUpdated() {
		let activeTags = [];
		for (let i = 0; i < NUM_TAGS; ++i) {
			if (this.tags.children.item(i).className === "tag-active") {
				activeTags.push(i);
			}
		}

		saveEntry(dateString(this.currentDate), undefined, activeTags);	

		publishTagChangedEvent(dateString(this.currentDate), activeTags);
	}

	updateFrom(date) {
		this.currentDate = date;
		
		loadEntry(dateString(date), (text, tags) => {
			this.activeTags = tags;

			for (let i = 0; i < NUM_TAGS; ++i) {
				this.tags.children.item(i).className = "tag-inactive";
			}

			for (let i = 0; i < tags.length; ++i) {
				this.tags.children.item(tags[i]).className = "tag-active";
			}
		});
	}

	connectedCallback() {
		const header = document.createElement("p");
		header.innerText = "Tags";

		this.appendChild(header);

		this.tagNames = loadUserTags();
		this.activeTags = [];
		this.tags = document.createElement("div");
		this.tags.className = "tags-flex";
		for (let i = 0; i < NUM_TAGS; ++i) {
			const tag = new Tag(i, this.tagNames, this.tagsUpdated.bind(this));
			this.tags.appendChild(tag);	
		}
		this.appendChild(this.tags);

		this.updateFrom(new Date());
		subscribeOpenDateEvent(this, (date) => this.updateFrom(date));
	}
}

customElements.define('m-tags', Tags);
