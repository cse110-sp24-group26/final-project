/* EVENTS.JS */
/* List of events/messages that are sent by the application, 
 * as well as utilities related to sending/receiving them
 */


export function publishTagChangedEvent(date, tags) {
	const event = new CustomEvent("tag_changed", 
		{ detail: 
			{
				date: date,
				tags: tags
			}
		}
	);
	document.body.dispatchEvent(event);
}

export function publishOpenDateEvent(date) {
	const event = new CustomEvent("open_date", 
		{ detail: 
			{
				date: date,
			}
		}
	);
	document.body.dispatchEvent(event);
}

// callback given date as first parameter, tags as second one
export function subscribeTagChangedEvent(callback) {
	document.body.addEventListener("tag_changed", (e) => {
		callback(e.detail.date, e.detail.tags);
	});
}

export function subscribeOpenDateEvent(callback) {
	document.body.addEventListener("open_date", (e) => {
		callback(e.detail.date);
	});
}
