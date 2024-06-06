/* 
 * File: tags.js
 * Description: Implementation of the tags component 
 * Author: Manu Bhat, Angelo Avanzado, Viann Perez Hernandez
 * Date: 6/4/2024
 */
import { dateString } from '../util.js';
import { loadEntry, saveEntry, loadUserTags, saveUserTags } from '../state/database.js';
import { publishTagChangedEvent, subscribeOpenDateEvent } from '../state/events.js';

const NUM_TAGS = 6;

/**
 * Represents a single Tag element. 
 * 
 * @class 
 * @extends {HTMLElement}
 */
class Tag extends HTMLElement {
    /**
     * Creates an instance of Tag
     * 
     * @constructor
     * @param {number} index - Index of the tag
     * @param {Array<string>} tagNames - Names of the tags 
     * @param {Function} toggleCallback - Callback function to be called when the tag state is toggled
     */
    constructor(index, tagNames, toggleCallback) {
        super();
        this.index = index;
        this.tagNames = tagNames;
        this.toggleCallback = toggleCallback;
    }

    /**
     * Sets up the button for the tag, including its text content.
     * Allows renaming of a tag. 
     */
    connectedCallback() {
        this.id = 'tag-' + this.index;

        const button = document.createElement("button");
        button.textContent = this.tagNames[this.index];

        // right-click context menu for renaming tag option
        button.oncontextmenu = (event) =>{
            event.preventDefault();
            const newText = prompt("Enter the new text for the tag:");
            if (newText !== null) {
                this.tagNames[this.index] = newText;
                button.textContent = newText;
                saveUserTags(this.tagNames);
            }
        };

        // click event listener for toggling tag state 
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

/**
 * Manages a collection of Tag elements. 
 * 
 * @class
 * @extends {HTMLElement}
 */
class Tags extends HTMLElement {
   /**
    * Callback function to handle updating of the tags.
    * Determines which tags are active and saves the current entry with those tags.  
    */
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

    /**
     * Updates the tags based on the provided date.
     * 
     * @param {Date} date - Date to load tags for 
     */
    updateFrom(date) {
        this.currentDate = date;
        
        loadEntry(dateString(date), (text, tags) => {
            this.activeTags = tags;

            // reset all tags to inactive
            for (let i = 0; i < NUM_TAGS; ++i) {
                this.tags.children.item(i).className = "tag-inactive";
            }

            // activate appropiate tags 
            for (let i = 0; i < tags.length; ++i) {
                this.tags.children.item(tags[i]).className = "tag-active";
            }
        });
    }

    /**
     * Sets up the tags component by loading and displaying user tags.  
     */
    connectedCallback() {
        const header = document.createElement("h1");
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

        // initialize with current date 
        this.updateFrom(new Date());
        subscribeOpenDateEvent(this, (date) => this.updateFrom(date));
    }
}

customElements.define('m-tags', Tags);
