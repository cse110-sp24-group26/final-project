class Calendar extends HTMLElement {
    connectedCallback() {
        
        // Sets up calendar skeleton, now with dropdowns for year/month
        this.innerHTML = `
            <div class="calendar">
                <header>
                    <button id="prev">&#9664</button>
                    <select id="month">
                    </select>
                    <select id="year">
                    </select>
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
        const monthSelect = this.querySelector('#month')
        const yearSelect = this.querySelector('#year')


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

        //populate months dropdown with months
        for (let i = 0; i < 12; i++) { 
                let curMonth = document.createElement("option");
                curMonth.setAttribute("value", i);
                curMonth.textContent = `${months[i]}`;
                monthSelect.append(curMonth);
            }

        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();

        //populate years 
        for (let j = -100; j < 100; j++)
            {
                let curYear = document.createElement("option");
                curYear.setAttribute("value", year+j);
                curYear.textContent = `${year+j}`;
                yearSelect.append(curYear);
            }

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
                datesHtml += `<li${className}><button>${i}</button></li>`;
            }

            for (let i = end; i < 6; i++) {
                datesHtml += `<li class="inactive">${i - end + 1}</li>`;
            }

            datesContainer.innerHTML = datesHtml;
            monthSelect.value = month;  //update month and year if changed with arrows
            yearSelect.value = year;

            
                var selectedState;  //current PROBLEM: This needs to be "remembered". 
                                    //Right now, changing the calendar "page" causes 
                                    //the selected date to be lost

                                    //I am considering storing a js Date object as well/instead*,
                                    //and everytime we load a new calendar page, we check if the currently selected
                                    //state is inside of it. If so, we update the corresponding li button to be in class: 'selected'

                                    // (*) I am using a element variable to store a reference to the element that is currently selected, 
                                    //so that I can deselect it without having to search for it. (I am not sure if this is actually that much more efficient,
                                    //given that the search is bounded by 31)

                                    //If I store just the Date, I can use that to select the corresponding li button if the date exists in the current month. 
                                    //This means that I won't have to keep track of any DOM elements, because all li buttons already default to not selected upon page load.

                                    //Also, we need to call whatever function is needed to relay the fact that a date was clicked to the rest of the app.

                                    //To clarify my understanding of the functionality of clicking: A new tab will be opened only when 
                                    //the user clicks on a date, and not when the user changes the calendar page.
                                    //i.e., if the user opens july 5, but the goes to look at the month of june, but chooses not to click any date, 
                                    //july 5 should still be open, and it should still appear as 'selected' on the calendar
            
                var clickableDates = document.querySelectorAll("li:has(button)");
                console.log(clickableDates)
                clickableDates.forEach((clickableDate) => {
                    clickableDate.addEventListener("click", (e) => {
                        if (selectedState) {
                            selectedState.className = "";
                        }
                        console.log(e.target);
                        e.target.setAttribute("class", "selected");
                        selectedState = e.target;
                        console.log(e.target.innerHTML);
                    });
                });
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

        //update calendar if changed from dropdown
        monthSelect.addEventListener("change", (e) => {
            month = parseInt(e.target.value);
            renderCalendar();
        });
        yearSelect.addEventListener("change", (e) => {
            year = parseInt(e.target.value);
            renderCalendar();
        });
        
        renderCalendar();
    }
}

customElements.define('m-calendar', Calendar)
