window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const dateTomorrow = Date.now() + 86400000;

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

    countTimer(dateTomorrow);

    //Menu
    const toggleMenu = () => {
        const menu = document.querySelector("menu"),
            menuItems = menu.querySelectorAll("ul>li>a");

        const body = document.querySelector("body");
        
        const handlerMenu = () => {
            menu.classList.toggle("active-menu");
        };

        body.addEventListener("click", event => {
            const target = event.target;
            
            if (target.closest(".menu")) {
                handlerMenu();
            } else if (target.className === "close-btn" && target.closest(".active-menu")) {
                handlerMenu();
            } else if (target.closest(".menu-links")) {
                handlerMenu();
            } else if (!target.closest(".active-menu")) {
                handlerMenu();
            }
        });
    };

    toggleMenu();

    //Popup
    const togglePopup = () => {
        const popup = document.querySelector(".popup"),
            popupBtn = document.querySelectorAll(".popup-btn"),
            popupContent = popup.querySelector(".popup-content");

        let innerWidth = window.innerWidth;

        window.addEventListener("resize", () => {
            innerWidth = window.innerWidth;
        });

        popupBtn.forEach(element => {
            element.addEventListener("click", () => {
                if (innerWidth < 768) {
                    popup.style.display = "block";
                } else {
                    let top = -60;

                    popup.style.display = "block";
                    popupContent.style.position = "absolute";
                    popupContent.style.top = `${top}%`;

                    requestAnimationFrame(function animate() {
                        if (top++ < 10) {
                            popupContent.style.top = `${top}%`;
                            requestAnimationFrame(animate);
                        }
                    });
                }
            });
        });

        popup.addEventListener("click", (event) => {
            let target = event.target;

            if (target.classList.contains("popup-close")) {
                popup.style.display = "none";
            } else {
                target = target.closest(".popup-content");

                if (!target) {
                    popup.style.display = "none";
                }
            }
        });
    };

    togglePopup();

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector(".service-header"),
            tab = tabHeader.querySelectorAll(".service-header-tab"),
            tabContent = document.querySelectorAll(".service-tab");

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add("active");
                    tabContent[i].classList.remove("d-none");
                } else {
                    tab[i].classList.remove("active");
                    tabContent[i].classList.add("d-none");
                }
            }
        };

        tabHeader.addEventListener("click", (event) => {
            let target = event.target;
            target = target.closest(".service-header-tab");

            if (target.classList.contains("service-header-tab")) {
                tab.forEach((item, tabIndex) => {
                    if (item === target) {
                        toggleTabContent(tabIndex);
                    }
                });
            }
        });
    };

    tabs();
});
