class Calendar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="calendar">
                <header>
                    <button id="prev>&#9664</button>
                    <h3 class="month-year"></h3>
                    <button id="next">&#9654</button>
                </header>
                <section class="calendar-body">
                    <ul class = "days">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul class="dates">
                        <!-- Dates will be listed here -->
                    </ul>
                </section>
            </div>
        `;
    }
}

customElements.define('m-calendar', Calendar)
