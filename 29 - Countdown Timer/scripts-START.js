let countdown;

const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const customTime = document.querySelector("#custom");

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const secondsLeft = seconds % 3600;
  const minutes = Math.floor(secondsLeft / 60);
  const remainderSeconds = seconds % 60;

  let timeDisplay = `${hours > 0 ? hours + ":" : ""}${
    minutes < 10 ? "0" : ""
  }${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  timeLeft.textContent = timeDisplay;
  document.title = timeDisplay;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Come back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if it shall be stopped!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startTimer() {
  timer(parseInt(this.dataset.time));
}

function startCustomTimer(event) {
  event.preventDefault();
  const customTime = this.querySelector("[name=minutes]").value;
  this.querySelector("[name=minutes]").value = "";
  timer(customTime * 60);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
customTime.addEventListener("submit", startCustomTimer);
