'use strict';

const sendForm = () => {
  const errorMsg = "Что-то пошло не так...",
    loadMsg = "Загрузка...",
    successMsg = "Спасибо! Мы скоро свяжемся с вами.",
    body = document.querySelector("body"),
    statusMsg = document.createElement("div");

  const insertMsg = (elem, msg) => {
    elem.textContent = msg;
  };

  const postData = (body) => {
    return fetch("../server.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: body
    });
  };

  const phoneValid = element => {
    const reg = /^\+?\d*$/;

    if (!reg.test(element.value.trim())) {
      element.value = element.value.slice(0, element.value.length - 1);
    }
  };

  const cyrValid = element => {
    const reg = /^([А-яЁ-ё]\s*)+\s*$/g;

    if (!reg.test(element.value.trim())) {
      element.value = element.value.slice(0, element.value.length - 1);
    }
  };

  body.addEventListener("submit", event => {
    event.preventDefault();
    const ourForm = event.target;

    if (ourForm.tagName === "FORM") {
      const formData = new FormData(ourForm);

      ourForm.appendChild(statusMsg);
      statusMsg.textContent = loadMsg;
      
      postData(formData)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(`>> status: ${response.status}`);
          }

          insertMsg(statusMsg, successMsg);
        })
        .catch((error) => {
          statusMsg.textContent = errorMsg;
          console.error(error);
        })
        .finally(ourForm.reset());
    }
  });

  body.addEventListener("input", event => {
    let target = event.target;

    if (target.classList.contains('form-phone')) {
      phoneValid(target);
    } else if (target.tagName.toLowerCase() === "input" &&
      target.name.toLowerCase() === "user_name") {
      cyrValid(target);
    } else if (target.tagName.toLowerCase() === "input" &&
      target.name.toLowerCase() === "user_message") {
      cyrValid(target);
    }
  });
};

export default sendForm;