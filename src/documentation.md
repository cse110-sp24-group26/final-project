# Documentation / Developer Manual

## Structure
Our application is built as a single page application with only one route. In it, the user encounters a page that, in code, is given as our root component. The root component then has three sub components: search, the editor, and the left sidebar. These are given as three separate directories. We also have another directory for certain state management operations, given under the state directory.

## State
Certain components have their own local state. For instance, the calendar keeps track of the currently selected month. Also, the editor keeps track of the currently selected tabs, as well as the currently open tab (if one exists). The distinction between the two being that currently selected tabs correspond to tabs in the navigation bar in, say, VSCode whereas the currently open tab is the actual file being edited. Finally, the search bar keeps track of the currently typed search query. Of course, there may be other minor state entities to keep track of, but these are omitted for brevity.

In our case, the application is simple enough that message-event/based programming is enough and we do not have the concept of a global application state.

The following events currently exist:
- open-tab: This event is emitted from the calendar, and is typically responded to by the tablist (owned by the editor). This event alerts the editor to open the given date in the tablist (if it's not already open), and for the editor to open the contents of the provided date. This event may also be triggered from the search-bar.
- tag-list-changed: This event is emitted from the main editor whenever the user changes a file and the parsed tags have been observed to change. This event is reacted by the calendar and the tablist, since the display of a given day in these two components depends on the tags for that event

Crucially, the actual file contents are stored in a database that we have built a small wrapper around. This database keeps track of the journal contents of any given day. It is queried whenever a new file/day is opened, and it is updated whenever said file is edited. It also saves certain user preferences and activities, such as the currently open tabs so that this appears the same between successive sessions of the application. For this reason, the database may be queried by other components during startup as well. Finally, the database is also queried by the search/navigation bar in order to display relevant results.
