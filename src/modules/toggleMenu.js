'use strict';

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

export default toggleMenu;