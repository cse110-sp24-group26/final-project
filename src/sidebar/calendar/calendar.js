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

        //declaring const references to DOM objects
        const header = this.querySelector('.month-year');
        const datesContainer = this.querySelector('.dates');
        const navs = document.querySelectorAll('#prev, #next');
        const monthSelect = this.querySelector('#month')
        const yearSelect = this.querySelector('#year')

        //declaring "global" vars that are used often
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let day = date.getDay();

        //initialize current date to open on page load (Maybe we want a different functionality?) (Good for now, though)
        date = new Date(year, month, new Date().getDate());
        year = date.getFullYear();
        month = date.getMonth();

        populateDropdown();

        enableMonthArrows();

        renderCalendar();

        //===========================================Functions Definitions Below========================================================

//----------------------------------------------------------------------------------------------------populateDropdown()
        //Adds dropdown functionality
        function populateDropdown() {
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

            //populate months
            for (let i = 0; i < 12; i++) { 
                let curMonth = document.createElement("option");
                curMonth.setAttribute("value", i);
                curMonth.textContent = `${months[i]}`;
                monthSelect.append(curMonth);
            }

            //populate years 
            for (let j = -5; j < 5; j++) {
                let curYear = document.createElement("option");
                curYear.setAttribute("value", year+j);
                curYear.textContent = `${year+j}`;
                yearSelect.append(curYear);
            }

            //update calendar if changed from dropdown
            monthSelect.addEventListener("change", (e) => {
                month = parseInt(e.target.value);
                renderCalendar();
            });
            yearSelect.addEventListener("change", (e) => {
                year = parseInt(e.target.value);
                renderCalendar();
            });

            monthSelect.value = month;  //update month and year if changed with arrows
            yearSelect.value = year;
        }

//-----------------------------------------------------------------------------------------------renderCalendar()
        //Renders the days in the calendar, including managing the selected day
        function renderCalendar() {
            // Figures out which dates of previous, current, and next month to display
            const start = new Date(year, month, 1).getDay();
            const endDate = new Date(year, month + 1, 0).getDate();
            const end = new Date(year, month, endDate).getDay();
            const endDatePrev = new Date(year, month, 0).getDate();

            let datesHtml = '';

            // Adds dates
            for (let i = start; i > 0; i--) { //dates not in month
                datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
            }

            for (let i = 1; i <= endDate; i++) { //dates in month
                let className =
                    i === date.getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                    ? ' class="today"'          //identifies which date is "today"
                    : "";
                    
                datesHtml += `<li${className} ><button id=${i} >${i}</button></li>`;//Each li has a button inside of it
            }                                                                       //Li might be today
                                                                                    //button contains id of day and text of day
            for (let i = end; i < 6; i++) { //dates not in month
                datesHtml += `<li class="inactive">${i - end + 1}</li>`;
            }

            datesContainer.innerHTML = datesHtml;   //place dates in the dom

            //Make buttons clickable
            var clickableDates = document.querySelectorAll("li:has(button)");
            clickableDates.forEach((clickableDate) => {
                clickableDate.addEventListener("click", (e) => {
                    changeSelectedDate(e);
                });
            });

            renderSelectedDate();

            //Store current date object in local memory, and publish --insert_correct_event_name_here-- event
            function changeSelectedDate(e) {
                const dateToStore = {"day" : parseInt(e.target.innerHTML), "month" : month, "year" : year};
                localStorage.setItem("selectedDayMonthYear", JSON.stringify(dateToStore));
                //publish event here
                renderCalendar();             
            }

            //Set the selected date's DOM properties so that it gets displayed by the css
            function renderSelectedDate() {
                var selectedDate = JSON.parse(localStorage.getItem("selectedDayMonthYear"));  
                if (selectedDate.year == year && selectedDate.month == month) { //if selected date is in this month
                    let stateToSelect = document.getElementById(`${selectedDate.day}`); 
                    stateToSelect.setAttribute("class", "selected"); //set the day of that button to be "selected"
                }
            }
        }

//-----------------------------------------------------------------------------------------------enableMonthArrows()
        // Adds next and prev click functionality to render next or prev month
        function enableMonthArrows() {
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

                    monthSelect.value = month;  //update month and year if changed with arrows
                    yearSelect.value = year;

                    renderCalendar();
                });
            });
        }   
    }
}

customElements.define('m-calendar', Calendar)
