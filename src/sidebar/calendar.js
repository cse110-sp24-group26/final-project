import {publishOpenDateEvent, subscribeOpenDateEvent} from '../state/events.js'   

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

        //declaring "global" vars that are used often (initialized to today)
        let todayDate = new Date();
        let month = todayDate.getMonth();
        let year = todayDate.getFullYear();
        let selectedDate = new Date();//This stores the date that is currently highlighted/open in the editor

        populateDropdown();

        enableMonthArrows();

        renderCalendar();

        subscribeOpenDateEvent(this, openDate);//I expect to recieve a JavaScript Date Object.

        openDate(new Date());   //Opens today's date on startup. 
                                //NOTE: We may need to publish an open_date event here to help the other components initialize to the same date.
        //openDate(new Date("10-10-2020"));//Testing purposes

//=====================================================Functions Definitions Below========================================================

//--------------------------------------------------------------------------------------------------------------------populateDropdown()
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
        }

//---------------------------------------------------------------------------------------------------------------------------renderCalendar()
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
                    i === todayDate.getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                    ? ' class="today"'          //identifies which date is "today"
                    : "";
                    
                datesHtml += `<li${className} ><button id=${i} >${i}</button></li>`;//Each li has a button inside of it
            }                                                                       //Li potentially has class: "today"
                                                                                    //button contains id of day and text of day
            for (let i = end; i < 6; i++) { //dates not in month
                datesHtml += `<li class="inactive">${i - end + 1}</li>`;
            }

            datesContainer.innerHTML = datesHtml;   //place dates in the dom

            monthSelect.value = month;  //set month and year in dropdown
            yearSelect.value = year;

            //Make buttons clickable
            var clickableDates = document.querySelectorAll("li:has(button)");
            clickableDates.forEach((clickableDate) => {
                clickableDate.addEventListener("click", (e) => {
                    changeSelectedDate(e.target.innerHTML);
                });
            });

            renderSelectedDate();

            //Update current date object, and publish open_date event
            function changeSelectedDate(newDay) {
                selectedDate.setFullYear(year);
                selectedDate.setMonth(month)
                selectedDate.setDate(parseInt(newDay));
                publishOpenDateEvent(selectedDate);//publish open date event with JavaScript Date Object
                renderCalendar();             
            }

            //Set the selected date's DOM properties so that it gets displayed by the css
            function renderSelectedDate() {
                if (selectedDate.getFullYear() == year && selectedDate.getMonth() == month) { //if selected date is in this month
                    let buttonToSelect = document.getElementById(`${selectedDate.getDate()}`); 
                    buttonToSelect.setAttribute("class", "selected"); //set the day of that button to be "selected"
                }
            }
        }

//------------------------------------------------------------------------------------------------------------------------enableMonthArrows()
        // Adds next and prev click functionality to render next or prev month
        function enableMonthArrows() {
            navs.forEach((nav) => {
                nav.addEventListener("click", (e) => {
                    const btnId = e.target.id;

                    if (btnId === "prev" && month === 0) {//edge case decrease month in jan
                        year--;
                        month = 11;
                    } else if (btnId === "next" && month === 11) {//edge case increase month in dec
                        year++;
                        month = 0;
                    } else {
                        month = btnId === "next" ? month + 1 : month - 1;//non-edge case
                    }

                    renderCalendar();
                });
            });
        }  
        
//-----------------------------------------------------------------------------------------------------------------------openDate()
        //Opens a given date. This is the callback function for subscribeOpenDateEvent()
        function openDate(dateToOpen) {
            month = dateToOpen.getMonth();
            year = dateToOpen.getFullYear();
            selectedDate = new Date(dateToOpen.getTime());
            renderCalendar();
        }//this could be a lambda (or whatever js calls it) inside the subscribeOpenDateEvent function, but I chose to leave it out
    }    //so that it can be used in other cases, whenever we want to open a specific date.
}

customElements.define('m-calendar', Calendar)
