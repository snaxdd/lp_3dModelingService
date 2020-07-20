'use strict';

const select = document.getElementById('cars'),
    output = document.getElementById('output');

let carsData = {};

const getData = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', './cars.json');
    request.setRequestHeader('Content-type', 'application/json');

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            const response = JSON.parse(request.responseText);
            resolve(response);
        } else {
            reject(request.statusText);
        }
    });

    request.send();
});

getData
    .then((response) => {
        carsData = response;
    }, (reject) => {
        output.innerHTML = `Произошла ошибка ${reject}`;
    });

select.addEventListener('change', () => {
    carsData.cars.forEach(item => {
        if (item.brand === select.value) {
            const { brand, model, price } = item;
            output.innerHTML = `Тачка ${brand} ${model} <br>
            Цена: ${price}$`;
        }
    });
});





/*select.addEventListener('change', () => {
    const request = new XMLHttpRequest();
    request.open('GET', './cars.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
            const data =
            data.cars.forEach(item => {
                if (item.brand === select.value) {
                    const { brand, model, price } = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                }
            });
        } else {
            output.innerHTML = 'Произошла ошибка';
        }
    });
});*/

