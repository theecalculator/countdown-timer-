//Target time
const targetDate = new
Date('2026-06-0700:00:00').getTime();

let lastHour = null;

//Get elements
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const milliseconds = document.getElementById('milliseconds');


const beep = new Audio('beep-01a.mp3')
//Audio('https://www.soundjay.com/buttons/sounds/beep-07.mp3');

function playBeep () {
  beep.currentTime = 0;
  beep.play();
}
/*
function playBeep () {
  const audio = new
  Audio('https://www.soundjay.com/buttons/sounds/beep-07.mp3');
  audio.play();
}
*/

function updateWidthFlip(element, newValue) {
  if (element.textContent !== newValue) {
    element.classList.add('flip');

    setTimeout(() => {
      element.textContent = newValue;
      element.classList.remove('flip');
    }, 200)
  }
}
//===========================================
//UPDATE TIME
//===========================================
function updateCountdown () {
  //current time
  const now = Date.now();

  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById('countdown').textContent = "Time's up!";
    return;
  }

  const daysl = Math.floor(distance/(1000*60*60*24));
  const hoursl = Math.floor((distance / (1000*60*60))%24);
  const minutesl =Math.floor((distance/(1000*60))%60);
  const secondsl = Math.floor((distance/1000)%60);
  const millisecondsl = Math.floor(distance%1000);

  if (lastHour !== null && hoursl !== lastHour) {
    playBeep();
    vibrateDevice([100, 50, 100]);
  }
  lastHour = hoursl;

  function vibrateDevice (duration = 200) {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  }

  updateWidthFlip(days.textContent = daysl.toString().padStart(2, '0'));
  updateWidthFlip(hours.textContent = hoursl.toString().padStart(2, '0'));
  updateWidthFlip(minutes.textContent = minutesl.toString().padStart(2, '0'));
  updateWidthFlip(seconds.textContent = secondsl.toString().padStart(2, '0'));
  updateWidthFlip(milliseconds.textContent = millisecondsl.toString().padStart(3, '0'));

  requestAnimationFrame(updateCountdown);

  //hours.toString().padStart(2, '0');
}

updateCountdown();
