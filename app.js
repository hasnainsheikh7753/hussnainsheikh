let intervalId = null;
let durationInSeconds = 0;
let timeLeft = durationInSeconds;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    const durationInput = document.getElementById("durationInput");
    durationInSeconds = parseDurationInput(durationInput.value);
    if (durationInSeconds <= 0) {
      alert("Please enter a valid duration (hh:mm:ss).");
      return;
    }

    timeLeft = durationInSeconds;
    intervalId = setInterval(updateTimer, 1000);
    isRunning = true;
    durationInput.disabled = true;
    document.getElementById("start").textContent = "Pause";
  } else {
    clearInterval(intervalId);
    isRunning = false;
    document.getElementById("start").textContent = "Resume";
  }
}

function resetTimer() {
  clearInterval(intervalId);
  isRunning = false;
  document.getElementById("start").textContent = "Start";
  document.getElementById("durationInput").disabled = false;
  timeLeft = durationInSeconds;
  updateTimer();
}

function updateTimer() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  document.getElementById("timerDisplay").textContent = timeString;

  if (timeLeft === 0) {
    clearInterval(intervalId);
    isRunning = false;
    document.getElementById("start").textContent = "Start";
    document.getElementById("durationInput").disabled = false;
  } else {
    timeLeft--;
  }
}

function parseDurationInput(input) {
  const [hours, minutes, seconds] = input.split(':').map(Number);
  return (isNaN(hours) ? 0 : hours * 3600) + (isNaN(minutes) ? 0 : minutes * 60) + (isNaN(seconds) ? 0 : seconds);
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
