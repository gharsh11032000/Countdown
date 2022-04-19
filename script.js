const inputContainer = document.querySelector(".input-container");
const countdownForm = document.querySelector(".form");
const titleEl = document.querySelector(".title");
const dateEl = document.querySelector(".date-picker");
const countdownEl = document.querySelector(".countdown");
const countdownElTitle = document.querySelector(".countdown-title");
const timeElements = document.querySelectorAll("span");
const countdownBtn = document.querySelector(".countdown-button");
const completeContainer = document.querySelector(".complete");
const completeInfo = document.querySelector(".complete-info");
const completeBtn = document.querySelector(".complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const zero = 0;

// Setimg min date to today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//Updating the dom
const updateDom = function () {
  countdownActive = setInterval(() => {
    const now = new Date();
    const distance = countdownValue - now;

    //Getting values
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //Updating values
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    //Hide input form
    inputContainer.hidden = true;
    //Showing countdown
    countdownEl.hidden = false;

    if (distance < 0) {
      completeContainer.hidden = false;
      countdownEl.hidden = true;
      completeInfo.textContent = `Finished on ${countdownDate}`;
    }
  }, second);
};

// Getting data from form
const updateCountdown = function (e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  countdownValue = new Date(countdownDate).getTime();
  updateDom();
};

// Reset UI
const reset = function () {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeContainer.hidden = true;

  clearInterval(countdownActive);
  countdownDate = "";
  countdownTitle = "";
  titleEl.value = "";
  dateEl.value = "";

  localStorage.removeItem("countdown");
};

// Restore Previous countdown

const restoreCountdown = function () {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownDate = savedCountdown.date;
    countdownTitle = savedCountdown.title;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
};

// Event listners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

//On load
restoreCountdown();
