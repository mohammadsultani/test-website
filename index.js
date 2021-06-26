const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const number = document.getElementById("number");
const numbersLesson = document.getElementById("numbersLesson");
const menuSection = document.getElementById("menu");
const menu = document.getElementsByClassName("header");
// Text to speech
const speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.volume = 1;

const updatedMenuFontSize = () => {
  if (window.innerWidth < 600) {
    for (let i = 0; i < menu.length; i++) {
      menu[i].classList.add("fs-6");
    }
  } else {
    for (let i = 0; i < menu.length; i++) {
      menu[i].classList.add("fs-3");
    }
  }
};
// Once it loads
window.onload = function () {
  return updatedMenuFontSize();
};
window.addEventListener("resize", updatedMenuFontSize);
leftButton.addEventListener("click", () => {
  disableButton();
  const value = Number(number.innerText) > 0 ? Number(number.innerText) - 1 : 0;
  number.innerHTML = value;
  speech.text = value;
  return window.speechSynthesis.speak(speech);
});

rightButton.addEventListener("click", () => {
  disableButton();
  const value = Number(number.innerText) + 1;
  number.innerHTML = value;
  speech.text = value;
  return window.speechSynthesis.speak(speech);
});

const disableButton = () => {
  rightButton.disabled = true;
  leftButton.disabled = true;
  return setTimeout(() => {
    rightButton.disabled = false;
    leftButton.disabled = false;
  }, 800);
};

const selectMenu = (num) => {
  if (num == 1) {
    menuSection.classList.add("d-none");
    numbersLesson.classList.remove("d-none");
    numbersLesson.classList.add("d-block");
  }
};
const back = () => {
  numbersLesson.classList.remove("d-block");
  numbersLesson.classList.add("d-none");
  menuSection.classList.remove("d-none");
  return menuSection.classList.add("d-flex");
};
