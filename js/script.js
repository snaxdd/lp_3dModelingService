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

    //Calculator
    const calc = (price = 100) => {
        const calcType = document.querySelector(".calc-type"),
            calcSquare = document.querySelector(".calc-square"),
            calcDay = document.querySelector(".calc-day"),
            calcCount = document.querySelector(".calc-count"),
            totalValue = document.getElementById("total");

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            let squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * squareValue * typeValue * countValue * dayValue;
            }

            totalValue.textContent = Math.floor(total);
        };

        calcContainer.addEventListener("change", event => {
            const target = event.target;

            if (target.matches(".calc-type") || target.matches(".calc-square") ||
                target.matches(".calc-day") || target.matches(".calc-count")) {
                countSum();
            }
        });
    };

    calc(100);

    //Send AJAX form
    const sendForm = () => {
        const errorMsg = "Что-то пошло не так...",
            loadMsg = "Загрузка...",
            successMsg = "Спасибо! Мы скоро свяжемся с вами.";

        const body = document.querySelector("body");

        const statusMsg = document.createElement("div");

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener("readystatechange", () => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open("POST", "../server.php");
            request.setRequestHeader("Content-Type", "application-json");
            request.send(JSON.stringify(body));
        };

        body.addEventListener("submit", event => {
            event.preventDefault();
            
            const ourForm = event.target;

            if (ourForm.tagName === "FORM") {
                ourForm.appendChild(statusMsg);
                statusMsg.textContent = loadMsg;

                const formData = new FormData(ourForm);

                let body = {};

                formData.forEach( (value, key) => {
                    body[key] = value;
                });

                postData(body, () => {
                    statusMsg.textContent = successMsg;
                    ourForm.reset();
                }, (error) => {
                    statusMsg.textContent = errorMsg;
                    console.log('Error :>> ', error);
                });
            }       
        });
    };

    sendForm();
});
