// sections
const menu = document.getElementsByClassName("header");
const menuSection = document.getElementById("menu");
const numbersQuizSection = document.getElementById("numbersQuizSection");
// Numbers lesson / page
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const number = document.getElementById("number");
const numbersLesson = document.getElementById("numbersLesson");
// Numbers quiz /page
const numbersOptions = document.getElementsByClassName("numbersOption");
const selectRandomNumBtn = document.getElementById("selectRandomNumBtn");

// Text to speech
const speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.volume = 1;
// random number
let randomNumber;

// Base on width of the screen
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

// *********************************************            Main Menu Code      ******************************************************************
const selectMenu = (num) => {
  if (num == 1) {
    menuSection.classList.add("d-none"); // hiding menu section
    numbersLesson.classList.remove("d-none");
    numbersLesson.classList.add("d-block"); // Showing numbers lesson
    speech.text = 0;
    return window.speechSynthesis.speak(speech);
  } else if (num == 2) {
    menuSection.classList.add("d-none"); // hiding menu section
    numbersQuizSection.classList.remove("d-none");
    return numbersQuizSection.classList.add("d-block"); // Showing numbers lesson
  }
};

// *********************************************            Numbers Lesson Code      ******************************************************************
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

// *********************************************             Numbers Quiz Code      ******************************************************************

const selectRandomNum = () => {
  selectRandomNumBtn.style.pointerEvents = "none";
  selectRandomNumBtn.style.opacity = "0.3";
  for (let index = 0; index < numbersOptions.length; index++) {
    numbersOptions[index].classList.remove("bg-danger");
    numbersOptions[index].classList.remove("bg-info");
  }
  randomNumber = Math.floor(Math.random() * 10) + 1;
  speech.text = randomNumber;
  window.speechSynthesis.speak(speech);
  generateRandomNumberOptions();
  return setTimeout(() => {
    selectRandomNumBtn.style.opacity = "1";
    return (selectRandomNumBtn.style.pointerEvents = "auto");
  }, 1000);
};
const selectOption = (option) => {
  for (let index = 0; index < numbersOptions.length; index++) {
    randomNumber == numbersOptions[index].innerHTML
      ? numbersOptions[index].classList.add("bg-info")
      : numbersOptions[index].classList.add("bg-danger");
  }
};
const generateRandomNumberOptions = () => {
  const correctEleIndex = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  const randomOptionsVal = [];
  const temparray = [];
  for (let index = 0; temparray.length < 3; index++) {
    let num = Math.floor(Math.random() * 20) + 1;
    if (num !== randomNumber && !temparray.includes(num)) {
      temparray.push(num);
    }
  }
  randomOptionsVal[correctEleIndex] = randomNumber;
  let i = 0;
  for (let index = 0; i < 3; index++) {
    if (!randomOptionsVal[index]) {
      randomOptionsVal[index] = temparray[i];
      i++;
    }
  }
  return randomOptionsVal.map((e, i) => {
    numbersOptions[i].innerHTML = e;
  });
};
//  Back to menu button
const back = () => {
  numbersLesson.classList.remove("d-block");
  numbersLesson.classList.add("d-none");
  numbersQuizSection.classList.remove("d-block");
  numbersQuizSection.classList.add("d-none");
  menuSection.classList.remove("d-none");
  return menuSection.classList.add("d-flex");
};
