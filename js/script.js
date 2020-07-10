window.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const dateTomorrow = Date.now() + 86400000,
        ourTeamContainer = document.getElementById("command"),
        calcContainer = document.querySelector(".calc-block");

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
        const btnMenu = document.querySelector(".menu"),
            menu = document.querySelector("menu"),
            closeBtn = document.querySelector(".close-btn"),
            menuItems = menu.querySelectorAll("ul>li>a");

        const handlerMenu = () => {
            menu.classList.toggle("active-menu");
        };

        btnMenu.addEventListener("click", handlerMenu);
        menu.addEventListener("click", (event) => {
            let target = event.target;

            if (target === closeBtn) {
                menu.classList.toggle("active-menu");
            } else {
                menuItems.forEach(item => {
                    if (target === item) {
                        menu.classList.toggle("active-menu");
                    }
                });
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

    //Slider

    const slider = () => {
        const slide = document.querySelectorAll(".portfolio-item"),
            btn = document.querySelectorAll(".portfolio-btn"),
            slider = document.querySelector(".portfolio-content"),
            dotsBox = document.querySelector(".portfolio-dots");

        let currentSlide = 0,
            interval,
            dot = [];

        const createDots = sliderItems => {
            for (let i = 0; i < sliderItems.length; i++) {
                const li = document.createElement("li");
                
                if (i === 0) {
                    li.className = "dot dot-active";
                } else {
                    li.className = "dot";
                }

                dot.push(li);
                dotsBox.append(dot[i]);
            }
        };

        createDots(slide);

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlider = () => {
            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");
            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, "portfolio-item-active");
            nextSlide(dot, currentSlide, "dot-active");
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlider, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener("click", (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches(".portfolio-btn, .dot")) {
                return;
            }

            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");

            if (target.matches("#arrow-right")) {
                currentSlide++;
            } else if (target.matches("#arrow-left")) {
                currentSlide--;
            } else if (target.matches(".dot")) {
                dot.forEach((elems, index) => {
                    if (elems === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, "portfolio-item-active");
            nextSlide(dot, currentSlide, "dot-active");
        });

        slider.addEventListener("mouseover", event => {
            if (event.target.matches(".portfolio-btn, .dot")) {
                stopSlide();
            }
        });

        slider.addEventListener("mouseout", event => {
            if (event.target.matches(".portfolio-btn, .dot")) {
                startSlide(1500);
            }
        });

        startSlide(1500);
    };

    slider();

    const changePhoto = event => {
        const target = event.target,
            firstSrc = target.getAttribute("src"),
            secondSrc = target.getAttribute("data-img");

        if (target.className === "command__photo" && event.type === "mouseover") {
            target.setAttribute("src", secondSrc);
            target.setAttribute("data-img", firstSrc);
        } else if (target.className === "command__photo" && event.type === "mouseout") {
            target.setAttribute("data-img", firstSrc);
            target.setAttribute("src", secondSrc);
        }
    };

    ourTeamContainer.addEventListener("mouseover", event => {
        changePhoto(event);
    });

    ourTeamContainer.addEventListener("mouseout", event => {
        changePhoto(event);
    });

    const inputDigitValid = target => {
        const inputs = ["calc-square", "calc-count", "calc-day"],
            reg = /\D/;

        for (let i = 0; i < inputs.length; i++) {
            let regClass = new RegExp(inputs[i]);

            if (regClass.test(target.className)) {
                target.value = target.value.replace(reg, "");
            }
        }
    };

    calcContainer.addEventListener("input", event => {
        inputDigitValid(event.target);
    });
});
