import { subscribeOpenDateEvent } from '../state/events.js'
import { saveEntry, loadEntry } from '../state/database.js'
import { dateString } from '../util.js'

class MainEditor extends HTMLElement {
    /**
     * Main editor constructor. Sets the currentDate to be today.
     */
    constructor() {
        super();
        // technically, there is a race condition near midnight
        // we are ignoring this for simplicity
        this.currentDate = new Date();
    }

    updateLines(_content) {
        // update the line numbers based off the new content    

        // i guess we'll just skip line numbers then...
    }

    /**
     * Returns the size of node. If node is a text node, then it is the length of the node. If it
     * is a break, then it is 1. Otherwise, it returns the sum of the sizes of the child nodes.
     * @param {Node} node 
     * @returns Size of node
     */
    nodeSize(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.length;
        }
        else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
            return 1;
        }
        else {
            let size = 0;
            for (let i = 0; i < node.childNodes.length; i++) {
                size += this.nodeSize(node.childNodes[i]);
            }
            return size;
        }
    }

    /**
     * Returns the current position of the cursor, or 0 if the user has not clicked on the page
     * yet.
     * @returns The current position of the cursor
     */
    getCursorPos() {
        const editor = document.getElementById("text-editor");;
        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
            return 0;
        }

        const range = selection.getRangeAt(0);
        let container = range.startContainer;
        let offset;
        if (container.nodeType === Node.TEXT_NODE) {
            offset = range.startOffset;
        } else {    
            offset = 0;
            for (let i = 0; i < range.startOffset; i++) {
                offset += this.nodeSize(container.childNodes[i]);
            }
        }

        while (container !== editor) {
            const parent = container.parentNode;  
            const indexInParent = Array.from(parent.childNodes).indexOf(container);
            for (let i = 0; i < indexInParent; i++) {
                offset += this.nodeSize(parent.childNodes[i]);
            }
            container = parent;
        }
        return offset;
    }

    /**
     * Sets the position of the cursor in node to the offset. If node is not a text node, it will set the position\
     * to be in a child node.
     * @param {Node} node 
     * @param {Number} offset 
     */
    _setPos(node, offset) {
        if (node.nodeType === Node.TEXT_NODE) {
            const range = document.createRange();
            range.setStart(node, offset);
            range.setEnd(node, offset);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
        else {
            let size = 0;
            for (let i = 0; i < node.childNodes.length; i++) {
                const childSize = this.nodeSize(node.childNodes[i]);
                if (offset == size + childSize) {
                    const range = document.createRange();
                    range.setStart(node, i + 1);
                    range.setEnd(node, i + 1);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                    return;
                }
                else if (offset < size + childSize) {
                    this._setPos(node.childNodes[i], offset - size);
                    return;
                }
                size += childSize;
            }
        }
    }

    /**
     * Sets the position of the cursor to the given position
     * @param {Number} pos 
     */
    setCursorPos(pos) {
        const editor = document.getElementById("text-editor");
        this._setPos(editor, pos);
    }

    /**
     * Renders the Markdown content in the editor by setting tags. Bolds, italicizes, and creates
     * headings.
     */
    renderMarkdown() {
        // note that <b> <i> </b> </i> is technically malformed by w3c
        // however, on most browsers it works out
        const editor = document.getElementById("text-editor");
        const content = editor.innerText;
        if (content === "") {
            if (editor.innerHTML !== "") {
                editor.innerHTML = "";
            }
            return;
        }

        const lines = content.split('\n');
        let cursor = 0;

        const events = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line[0] == "#") {
                events.push({type: "heading", position: cursor});
            }
            
            for (let j = 0; j < line.length; j++) {
                if (line[j] === "*" && j + 1 < line.length && line[j + 1] === "*") {
                    events.push({type: "bold", position: cursor + j});
                    j++;
                }
                else if (line[j] === "_") {
                    events.push({type: "italic", position: cursor + j});
                }
            }

            if (line[0] === "#") {
                events.push({type: "heading", position: cursor + line.length});
            }

            // skip the delimmeter as well
            cursor += line.length + 1;
        }
       
        let html = "";
        let eventIndex = 0;
        html += "<span>";
        let state = {
            bold: false,
            heading: false,
            italic: false
        };
        
        const startwords = {
            "bold": "**",
            "italic": "_",
            "heading": "#"
        } 

        const endwords = {
            "bold": "**",
            "italic": "_",
            "heading": "<br>"
        } 

        for (let j = 0; j < content.length; ++j) {
            if (eventIndex < events.length && events[eventIndex].position === j) {
                const event = events[eventIndex];
                const before = state[event.type];
                if (before) {
                    html += endwords[event.type];
                    // basically \n to <br> causes problems
                    // ugly hack
                    j += startwords[event.type].length - 1;
                }

                html += "</span>";
               
                state[event.type] = !state[event.type];
                html += "<span class=\"";
                if (state.bold) {
                    html += "editor-bold ";
                }
                if (state.italic) {
                    html += "editor-italic ";
                }
                if (state.heading) {
                    html += "editor-heading";
                }
                html += "\">"

                if (!before) {
                    html += startwords[event.type];
                    // basically \n to <br> causes problems
                    j += startwords[event.type].length - 1;
                }

                eventIndex++;
            }
            else {
                switch (content[j]) {
                    case '&':
                        html += '&amp;';
                        break;
                    case '<':
                        html += '&lt;';
                        break;
                    case '>':
                        html += '&gt;';
                        break;
                    case '"':
                        html += '&quot;';
                        break;
                    case "'":
                        html += '&#039;';
                        break;
                    case '\n':
                        html += "<br>";
                        break;
                    default:
                        html += content[j];
                }
            }
        }
        html += "</span>";

        if (editor.innerHTML !== html) {
            let pos = this.getCursorPos();
            console.log(pos)
            editor.innerHTML = html;
            if (pos !== 0) {
                this.setCursorPos(pos);
            }
        }
    }

    /**
     * Loads the entry associated with the given date, and updates the displayed date
     * @param {Date} date
     */
    loadDate(date) {
        this.currentDate = date;
        console.log(date)
        const dateE = document.getElementById("editor-date");  
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        dateE.innerText = formattedDate;

        loadEntry(dateString(date), (text, _tags) => {
            const editor = document.getElementById("text-editor");
            editor.innerText = text;
            editor.focus();

            this.renderMarkdown();
        });
    }

    /**
     * Initializes the main editor. Saves the previous contents and subscribes to the open date event to load the page
     */
    connectedCallback() {
        this.innerHTML = `
                <p id="editor-date">
                </p>
                <div id="editor-scroll">
                    <div id="line-nums">
                    </div>

                    <div autofocus contenteditable="true" id="text-editor">
                    </div>
                </div>
            </div>
        `;

        const editor = document.getElementById("text-editor");

        /* saving file contents */
        this.old = "";
        const observer = new MutationObserver((mutations) => {
            const date = dateString(this.currentDate);
            const text = editor.innerText;
            if (text !== this.old) {
                this.old = text;
                this.renderMarkdown(text);
                saveEntry(date, text, undefined);
            }
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
            this.old = "";
            this.loadDate(date);
        });
    }
}

customElements.define('m-main-editor', MainEditor);
