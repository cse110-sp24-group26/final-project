class Calendar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="calendar">
                <header>
                    <button id="prev">&#9664</button>
                    <h3 class="month-year"></h3>
                    <button id="next">&#9654</button>
                </header>
                <section class="calendar-body">
                    <ul class = "days">
                        <li>S</li>
                        <li>M</li>
                        <li>T</li>
                        <li>W</li>
                        <li>T</li>
                        <li>F</li>
                        <li>S</li>
                    </ul>
                    <ul class="dates">
                        <!-- Dates will be listed here -->
                    </ul>
                </section>
            </div>
        `;

        this.updateCalendar(new Date());
    }


    /**
     * This function updates the calendar dates and header of the current month and year
     * @param {Date} date 
    */
    updateCalendar(date) {
        const monthYearHeading = this.querySelector('.month-year');
        const datesContainer = this.querySelector('.dates');

        datesContainer.innerHTML = '';

        const month = date.getMonth();
        const year = date.getFullYear();
        monthYearHeading.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            datesContainer.innerHTML += `<li class="date empty"></li>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            datesContainer.innerHTML += `<li class="date">${i}</li>`;
        }
    }
}

customElements.define('m-calendar', Calendar)
