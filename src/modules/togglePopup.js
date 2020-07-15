'use strict';

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

export default togglePopup;