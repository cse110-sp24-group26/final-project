class Calendar extends HTMLElement {
    connectedCallback() {
        
        // Sets up calendar skeleton
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

        const header = this.querySelector('.month-year');
        const datesContainer = this.querySelector('.dates');
        const navs = document.querySelectorAll('#prev, #next');

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();

        function renderCalendar() {
            // Figures out which dates of previous, current, and next month to display
            const start = new Date(year, month, 1).getDay();
            const endDate = new Date(year, month + 1, 0).getDate();
            const end = new Date(year, month, endDate).getDay();
            const endDatePrev = new Date(year, month, 0).getDate();

            let datesHtml = '';

            // Adds dates
            for (let i = start; i > 0; i--) {
                datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
            }

            for (let i = 1; i <= endDate; i++) {
                let className =
                    i === date.getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                        ? ' class="today"'
                        : "";
                datesHtml += `<li${className}>${i}</li>`;
            }

            for (let i = end; i < 6; i++) {
                datesHtml += `<li class="inactive">${i - end + 1}</li>`;
            }

            datesContainer.innerHTML = datesHtml;
            header.textContent = `${months[month]} ${year}`;
        }

        // Adds next and prev click functionality to render next or prev month
        navs.forEach((nav) => {
            nav.addEventListener("click", (e) => {
                const btnId = e.target.id;

                if (btnId === "prev" && month === 0) {
                    year--;
                    month = 11;
                } else if (btnId === "next" && month === 11) {
                    year++;
                    month = 0;
                } else {
                    month = btnId === "next" ? month + 1 : month - 1;
                }

                date = new Date(year, month, new Date().getDate());
                year = date.getFullYear();
                month = date.getMonth();

                renderCalendar();
            });
        });

        renderCalendar();
    }
}

customElements.define('m-calendar', Calendar)
