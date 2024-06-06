/* EVENTS.JS */
/* List of events/messages that are sent by the application, 
 * as well as utilities related to sending/receiving them
 */


/** Synchronously publishes a tag changed event to the entire application. This will only be called
 * by the tag selector.
 *
 * @param date a js date object the highlights the date of which the tag was changed 
 * @param tags a list of INDICES (i.e. numbers) denoting which indices of tags are selected
 * @return none
 */
export function publishTagChangedEvent(date, tags) {
    const event = new CustomEvent("tag_changed", 
        { 
            detail: 
                {
                    date: date,
                    tags: tags
                }
        }
    );
    document.body.dispatchEvent(event);
}

/** Sychronously publishes an event that dictates that the current date is going to be opened
 * This should be called by the calendar whenever a date is clicked, by the search bar whenever a query
 * is selected, and by the tab list whenever a new tab is selected
 *
 * @param date a js date object dictating the date that should be opened
 * @return none
 */
export function publishOpenDateEvent(date) {
    const event = new CustomEvent("open_date", 
        { 
            detail: 
                {
                    date: date,
                }
        }
    );
    document.body.dispatchEvent(event);
}

// Make the function globally accessible for Cypress tests and other external scripts
window.publishOpenDateEvent = publishOpenDateEvent;

// callback given date as first parameter, tags as second one
/** Permanently registers a callback that is called synchronously whenever a 
 * tag changed event is published
 *
 * @param target the html node for which the listener must be placed on (currently ignored)
 * @param callback a function that takes two parameters and will be called whenever the event in question occurs: the first parameter is the date where the tags were changed, and the second is a list of tags, given as the indices (i.e. numbers) of the new tags
 * @return none
 */
export function subscribeTagChangedEvent(target, callback) {
    document.body.addEventListener("tag_changed", (e) => {
        callback(new Date(e.detail.date.getTime()), e.detail.tags);
    });
}

/** Permanently registers a callback that is called synchronously whenever a 
 * open date event is published
 *
 * @param target the html node for which the listener must be placed on (currently ignored)
 * @param callback a function that takes one parameter and will be called whenever the event in question occurs: the first parameter is the date that is to be opened
 * @return none
 */
export function subscribeOpenDateEvent(target, callback) {
    document.body.addEventListener("open_date", (e) => {
        callback(e.detail.date);
    });
}
