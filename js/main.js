const audio = document.querySelector('#audio');

var timerInterval;
var totalTime = 0;
var remainingTime = 0;
let muted = false;
var stopWatchInterval;
var hoursWatchStart = 0;
var minutesWatchStart = 0;
var secondsWatchStart = 0;

var tabs = document.querySelectorAll('.tab');
var tabContents = document.querySelectorAll('.tab-pane');

function changeTab(index) {
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    tabContents[i].classList.remove('show');
  }

  tabs[index].classList.add('active');
  tabContents[index].classList.add('show');
}

const inputs = document.querySelectorAll('input');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', () => {
    inputs[i].value.length == 2;
    if (inputs[i].value.length == inputs[i].maxLength) {
      i <= 1 && inputs[i + 1].focus();
      i == 2 && document.getElementById('start-btn').focus();
    }
  });
}

function startTimer() {
  var hoursInput = parseInt(document.getElementById('hours-input').value);
  var minutesInput = parseInt(document.getElementById('minutes-input').value);
  var secondsInput = parseInt(document.getElementById('seconds-input').value);

  if (isNaN(hoursInput) || hoursInput == 0) {
    hoursInput = 0;
  }
  if (isNaN(minutesInput) || minutesInput == 0) {
    minutesInput = 5;
  }
  if (isNaN(secondsInput) || secondsInput == 0) {
    secondsInput = 0;
  }

  remainingTime = hoursInput * 3600 + minutesInput * 60 + secondsInput;

  timerInterval = setInterval(decrementTimer, 1000);
  document.getElementById('start-btn').disabled = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById('start-btn').disabled = false;
}

function resetTimer() {
  stopTimer();
  totalTime = 0;
  remainingTime = 0;
  updateTimerDisplay();
  document.querySelector('#sound-mute').innerHTML =
    '<img src="https://img.icons8.com/?size=2x&amp;id=41562&amp;format=png 2x" width="20" height="20" srcset="https://img.icons8.com/?size=2x&amp;id=41562&amp;format=png 2x,https://img.icons8.com/?size=1x&amp;id=41562&amp;format=png 1x" alt="Sound icon">';
}

function decrementTimer() {
  remainingTime--;
  if (remainingTime === 0) {
    stopTimer();
    muted == false && audio.play();
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  var hours = Math.floor(remainingTime / 3600);
  var minutes = Math.floor((remainingTime % 3600) / 60);
  var seconds = remainingTime % 60;

  document.getElementById('hours-input').value = padTime(hours);
  document.getElementById('minutes-input').value = padTime(minutes);
  document.getElementById('seconds-input').value = padTime(seconds);
}

function padTime(time) {
  return time.toString().padStart(2, '0');
}

function mute() {
  muted = !muted;
  muted
    ? (document.querySelector('#sound-mute').innerHTML =
        '<img srcset="https://img.icons8.com/?size=2x&amp;id=644&amp;format=png 2x, https://img.icons8.com/?size=1x&amp;id=644&amp;format=png 1x" src="https://img.icons8.com/?size=2x&amp;id=644&amp;format=png 2x" alt="Mute icon" width="20" height="20" style="filter: invert(0%) sepia(0%) saturate(7466%) hue-rotate(236deg) brightness(108%) contrast(107%);">')
    : (document.querySelector('#sound-mute').innerHTML =
        '<img src="https://img.icons8.com/?size=2x&amp;id=41562&amp;format=png 2x" width="20" height="20" srcset="https://img.icons8.com/?size=2x&amp;id=41562&amp;format=png 2x,https://img.icons8.com/?size=1x&amp;id=41562&amp;format=png 1x" alt="Sound icon">');
  muted && audio.pause();
}

function startWatchTimer() {
  stopWatchInterval = setInterval(UpdateWatchTimer, 1000);
  document.getElementById('start-watch-btn').disabled = true;
}

function stopWatchTimer() {
  clearInterval(stopWatchInterval);
  document.getElementById('start-watch-btn').disabled = false;
}

function resetWatchTimer() {
  stopWatchTimer();
  hoursWatchStart = 0;
  minutesWatchStart = 0;
  secondsWatchStart = 0;
  UpdateWatchTimerDisplay();
}

function UpdateWatchTimer() {
  secondsWatchStart++;
  if (secondsWatchStart === 60) {
    secondsWatchStart = 0;
    minutesWatchStart++;
    if (minutesWatchStart === 60) {
      minutesWatchStart = 0;
      hoursWatchStart++;
    }
  }
  UpdateWatchTimerDisplay();
}

function UpdateWatchTimerDisplay() {
  document.getElementById('hours').textContent = padTime(hoursWatchStart);
  document.getElementById('minutes').textContent = padTime(minutesWatchStart);
  document.getElementById('seconds').textContent = padTime(secondsWatchStart);
}
