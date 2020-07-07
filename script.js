"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const greetings = document.querySelector('#greetings'),
        today = document.querySelector('#today'),
        currentTime = document.querySelector('#current_time'),
        newYear = document.querySelector('#new_year');
    let currentDate = new Date(),
        newYearDate = new Date("31 Dec 2020 23:59:59");

    const dayOfTheWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    const timesOfDay = time => {
        if (time >= 5 && time <= 11) {
            return "Доброе утро";
        } else if (time >= 12 && time <= 16) {
            return "Добрый день";
        } else if (time >= 17 && time <= 23) {
            return "Добрый вечер";
        } else if (time >= 24 && time <= 4) {
            return "Доброй ночи";
        }
    };

    const timePad = n => {
        if (n < 10) {
            return `0${n}`;
        } else {
            return n;
        }
    };

    const convertHourseAMPM = time => {
        let amPm = 'PM',
            newHours = (time + 24) % 12;

        if (time < 12) {
            amPm = 'AM';
        }

        return {amPm, newHours};
    };

    const newHours = convertHourseAMPM(currentDate.getHours());
    const daysUntilNewYear = Math.floor((newYearDate - currentDate) / 1000 / 60 / 60 / 24);

    greetings.textContent = timesOfDay(currentDate.getHours());
    today.textContent = `Сегодня: ${dayOfTheWeek[currentDate.getDay()]}`;
    newYear.textContent = `До нового года осталось ${daysUntilNewYear} дней`;
    setInterval(() => {
        currentDate = new Date();
        currentTime.textContent = `Текущее время: ${timePad(newHours.newHours)}:${timePad(currentDate.getMinutes())}:` +
        `${timePad(currentDate.getSeconds())} ${newHours.amPm}`;
    }, 1000);
});