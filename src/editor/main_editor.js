import { subscribeOpenDateEvent } from '../state/events.js'
import { saveEntry, loadEntry } from '../state/database.js'
import { dateString } from '../util.js'

class MainEditor extends HTMLElement {
	constructor() {
		super();
		// technically, there is a race condition near midnight
		// we are ignoring this for simplicity
		this.currentDate = new Date();
	}

	updateLines(content) {
		// update the line numbers based off the new content	
	}

	renderMarkdown(content) {
		// render basic markdown formatting based off the new content

		// note that <b> <i> </b> </i> is technically malformed by w3c
		// however, on most browsers it works out

		/* handle headings */
		/* handle bold */
		/* handle italics */
	}

	loadDate(date) {
		this.currentDate = date;

		loadEntry(dateString(date), (text, _tags) => {
			const editor = document.getElementById("text-editor");
			editor.innerText = text;

			this.updateLines(text);
			this.renderMarkdown(text);
		});
	}

	connectedCallback() {
		this.innerHTML = `
			<div id="line-nums">
			</div>

			<div autofocus contenteditable="plaintext-only" id="text-editor">
			</div>
		`;

		const editor = document.getElementById("text-editor");

		/* saving file contents */
		const observer = new MutationObserver((mutations) => {
			const date = dateString(this.currentDate);
			const text = editor.textContent;
			
			saveEntry(date, text, undefined);
		});

		const observerConfig = { 
			characterData: true, 
			attributes: false, 
			childList: true, 
			subtree: true 
		};
		observer.observe(editor, observerConfig);
		
		/* loading file contents */
		this.loadDate(new Date());
		subscribeOpenDateEvent(this, (date) => {
			this.loadDate(date);
		});
	}
}

customElements.define('m-main-editor', MainEditor);
