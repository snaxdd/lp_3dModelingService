window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds");

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };
        }

        function timePad(n) {
            if (n < 10) {
                return `0${n}`;
            } else {
                return n;
            }
        }

        function updateClock() {
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
        }

        setInterval(updateClock, 1000);
    }

    countTimer("7 july 2020");
});
