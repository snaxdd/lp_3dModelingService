window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    
    //Timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds");

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };
        };

        const timePad = (n) => {
            if (n < 10) {
                return `0${n}`;
            } else {
                return n;
            }
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
            } else {
                timerHours.textContent = timePad(timer.hours);
                timerMinutes.textContent = timePad(timer.minutes);
                timerSeconds.textContent = timePad(timer.seconds);
            }
        };

        updateClock(); 
        setInterval(updateClock, 1000);
    };

    countTimer("7 july 2020");

    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector(".menu"),
            menu = document.querySelector("menu"),
            closeBtn = document.querySelector(".close-btn"),
            menuItems = menu.querySelectorAll("ul>li>a");
        
        const handlerMenu = () => {
            menu.classList.toggle("active-menu");
        };

        btnMenu.addEventListener("click", handlerMenu);
        closeBtn.addEventListener("click", handlerMenu);
        
        menuItems.forEach(element => {
            element.addEventListener("click", handlerMenu);
        });
    };

    toggleMenu();

    //Popup
    const togglePopup = () => {
        const popup = document.querySelector(".popup"),
            popupBtn = document.querySelectorAll(".popup-btn"),
            popupClose = document.querySelector(".popup-close");

        popupBtn.forEach(element => {
            element.addEventListener("click", () => {
                popup.style.display = "block";
            });
        });

        popupClose.addEventListener("click", () => {
            popup.style.display = "none";
        });
    };

    togglePopup();
});
