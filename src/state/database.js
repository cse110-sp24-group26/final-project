/* DATABASE.js */
/* A proxy around IndexedDB that allows for bindings to the application's file storage
 * In addition, it serves certain user session/preference data 
 */

/** Loads whether the user prefers dark or light theme 
 *
 * @return the preferred user theme: either the string 'dark' or the string 'light'
 */
export function loadUserThemePreference() {
	localStorage.getItem("user-theme") || 'light';
}

/* Saves whether the user prefers dark or light theme
 *
 * @param theme either the string 'light' or the string 'dark'
 */
export function saveUserThemePreference(theme) {
	localStorage.setItem("user-theme", theme);
}

// last opened tabs
export function loadUserTabs(callback) {
	const tabs = localStorage.getItem("user-tabs");
	if (tabs === null) {
		return [];
	}
	else {
		return JSON.parse(tabs);
	}
}

/** Saves the currently opened tabs to local storage
 *
 * @param tabs the list of dates denoting the currently opened tabs. It is assumed that the first tab in the list is the currently opened one, if one exists
 * @return none
 */
export function saveUserTabs(tabs) {
	localStorage.setItem("user-tabs", JSON.stringify(tabs));
}

/** Loads the name of the user tags from local storage, or a default value
 *
 * @return a list of 6 strings, denoting the name of the 6 tags 
 */
export function loadUserTags(callback) {
	const tabs = localStorage.getItem("user-tags");
	if (tabs === null) {
		return ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6"];
	}
	else {
		return JSON.parse(tabs);
	}
}

/** Saves the user tag names to local storage 
 * @param tags a list of 6 strings, denoting the names of all of the different tags
 * @return none
 */
export function saveUserTags(tags) {
	localStorage.setItem("user-tags", JSON.stringify(tags));
}

/* actual database functions */
let db = null;
/** Only to be used during testing 
 *
 */
export function initDB() {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open("main_db", 1);
		request.onupgradeneeded = (e) => {
			const store = e.target.result.createObjectStore('entries', { 
				keyPath: "date"
			});

			store.createIndex('date', 'date', { unique: true });
			store.createIndex('tags', 'tags', { unique: false });
			store.createIndex('content', 'content', { unique: false });
			console.log("Creating Database");
		};

		request.onsuccess = (e) => {
			db = e.target.result;
			console.log("Database successfully created");
			resolve(undefined);
		};

		request.onerror = (e) => {
			db = e.target.result;
			console.error("Database failed to initialize");
			reject(e);
		};
	});
}

window.addEventListener('load', async () => {
	await initDB();
});

/** Loads entry
 * @param date date string (e.g. '2024-11-21')
 * @param callback function that is called with (text_content_string, list of string tags)
 * @return none
 */
export function loadEntry(date, callback) {
	const transaction = db.transaction("entries", "readwrite");

	const entryStore = transaction.objectStore("entries");
	const request = entryStore.get(date);
	request.onerror = () => {
		// record doesn't exist
		console.error("Database transaction failed");
	};

	request.onsuccess = () => {
		if (request.result) {
			callback(request.result.content, request.result.tags);
		}
		else {
			callback("", []);
		}
	};
}

/** Saves entry
 * @param date date string (e.g. '2024-11-21')
 * @param content content string
 * @param tags list of string
 * @return none
 */
export function saveEntry(date, content, tags) {
	const transaction = db.transaction("entries", "readwrite");

	const entryStore = transaction.objectStore("entries");
	const request = entryStore.put({date: date, content: content, tags: tags});
	// no need for callbacks on success
	request.transaction.onerror = () => {
		console.error("Database transaction failed");
	};
}


function entryMatchesQuery(entry, query) {
	return "Matches!"
}

/** finds search results 
 * @param query string
 * @param callback is a function that takes a list of 2-tuples, the first being the date string, and the second being the matched result
 * @return none
 */
export function searchQuery(query, callback) {
	const transaction = db.transaction("entries", "readwrite");

	const entryStore = transaction.objectStore("entries");
	const request = entryStore.openCursor();

	const results = [];
	request.onsuccess = (e) => {
		const cursor = e.target.result;
		if (cursor) {
			const curr = cursor.value;
		
			const matching = entryMatchesQuery(curr, query);
			if (matching !== null) {
				results.push(matching);
			}

			cursor.continue();
		} else {
			callback(results);						
		}
	};

	request.onerror = () => {
		console.error("Database search failed");
	};
}
