'use strict';

const teamPhoto = () => {
  const ourTeamContainer = document.getElementById("command");

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
};

export default teamPhoto;