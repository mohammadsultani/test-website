const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const number = document.getElementById("number");
const numbersLesson = document.getElementById("numbersLesson");
const menuSection = document.getElementById("menu");
const numbersQuizSection = document.getElementById("numbersQuizSection");
const menu = document.getElementsByClassName("header");
// For quiz
const numbersOptions = document.getElementsByClassName("numbersOption");

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

// Numbers quiz
const selectOption = (option) => {
  for (let index = 0; index < numbersOptions.length; index++) {
    randomNumber == numbersOptions[index].innerHTML
      ? numbersOptions[index].classList.add("bg-info")
      : numbersOptions[index].classList.add("bg-danger");
  }
};

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

const generateRandomNumberOptions = () => {
  const correctEleIndex = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  const randomOptionsVal = [null, null, null, null];
  randomOptionsVal[correctEleIndex] = randomNumber;
  console.log(randomOptionsVal, "bbbbbbbbbbb");
  let i = 0;
  while (i < 4) {
    console.log('all run')
    if (!randomOptionsVal[i]) {
      const randNum = Math.floor(Math.random() * 20) + 1;
      if (!randomOptionsVal.includes(randNum)) {
        randomOptionsVal[i] = randNum;
        console.log('run')
        i++;
      }
    }
    i++;
  }
  console.log(randomOptionsVal, "aaaaaaaaaaaaaaaaaaaaa");
  return randomOptionsVal.map((e) => {
    if (e) {
      numbersOptions[i].innerHTML = e;
      i += 1;
    }
  });
};

const selectRandomNum = () => {
  for (let index = 0; index < numbersOptions.length; index++) {
    numbersOptions[index].classList.remove("bg-danger");
    numbersOptions[index].classList.remove("bg-info");
  }
  randomNumber = Math.floor(Math.random() * 10) + 1;
  speech.text = randomNumber;
  window.speechSynthesis.speak(speech);
  return generateRandomNumberOptions();
};

const back = () => {
  numbersLesson.classList.remove("d-block");
  numbersLesson.classList.add("d-none");
  menuSection.classList.remove("d-none");
  return menuSection.classList.add("d-flex");
};
