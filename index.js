const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const number = document.getElementById("number");
// Text to speech
const speech = new SpeechSynthesisUtterance();
speech.lang = "en";
speech.volume = 1

leftButton.addEventListener("click", () => {
  const value = Number(number.innerText) > 0 ? Number(number.innerText) - 1 : 0;
  number.innerHTML = value;
  speech.text = value;
  window.speechSynthesis.speak(speech);
});

rightButton.addEventListener("click", () => {
  const value = Number(number.innerText) + 1;
  number.innerHTML = value;
  speech.text = value;
  window.speechSynthesis.speak(speech);
});
