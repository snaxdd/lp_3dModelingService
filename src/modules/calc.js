'use strict';

const calc = (price = 100) => {
  const calcType = document.querySelector(".calc-type"),
    calcSquare = document.querySelector(".calc-square"),
    calcDay = document.querySelector(".calc-day"),
    calcCount = document.querySelector(".calc-count"),
    totalValue = document.getElementById("total"),
    calcContainer = document.querySelector(".calc-block");

  const countSum = () => {
    const typeValue = calcType.options[calcType.selectedIndex].value;
    
    let total = 0,
      countValue = 1,
      dayValue = 1,
      squareValue = +calcSquare.value;

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

  calcContainer.addEventListener("change", event => {
    const target = event.target;

    if (target.matches(".calc-type") || target.matches(".calc-square") ||
      target.matches(".calc-day") || target.matches(".calc-count")) {
      countSum();
    }
  });

  calcContainer.addEventListener("input", event => {
    inputDigitValid(event.target);
  });
};

export default calc;