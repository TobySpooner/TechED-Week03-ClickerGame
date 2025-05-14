const input = document.querySelector('input');
const yenDisplay = document.querySelector('p');
const body = document.querySelector('body');
const yenCoin = document.querySelector('#yenCoin');
const cpsBtn = document.querySelector('#cps');
const multiplierBtn = document.querySelector('#multiplier');
const multiplierPriceDisplay = document.getElementById('multiplierPriceDisplay');
const cpsPriceDisplay = document.getElementById('cpsPriceDisplay');
const multiplierDisplay = document.getElementById('multiplierDisplay');
const cpsDisplay = document.getElementById('cpsDisplay');

let yen = 0;
let cps = 0;
let cpsPrice = 25;
let multiplier = 1;
let multiplierPrice = 100;
let cpsInterval = null;

var clickSound = new Audio("Cropped.mp3")

function updateDisplays() {
  yenDisplay.textContent = `¥${yen.toLocaleString()}`;
  multiplierPriceDisplay.textContent = `Price: ¥${multiplierPrice.toLocaleString()}`;
  cpsPriceDisplay.textContent = `Price: ¥${cpsPrice.toLocaleString()}`;
  multiplierDisplay.textContent = `Multiplier: x${multiplier.toLocaleString()}`;
  cpsDisplay.textContent = `CPS: ${cps.toLocaleString()}`;
}

function saveState() {
  localStorage.setItem('Yen', yen);
  localStorage.setItem('CPS', cps);
  localStorage.setItem('CPSPrice', cpsPrice);
  localStorage.setItem('Multiplier', multiplier);
  localStorage.setItem('MultiplierPrice', multiplierPrice);
}

function startCpsInterval() {
  if (cpsInterval) clearInterval(cpsInterval);
  if (cps > 0) {
    cpsInterval = setInterval(() => {
      yen += cps;
      yenDisplay.textContent = `¥${yen.toLocaleString()}`;
      localStorage.setItem('Yen', yen);
    }, 1000);
  }
}

function loadState() {
  yen = Number(localStorage.getItem('Yen')) || 0;
  cps = Number(localStorage.getItem('CPS')) || 0;
  cpsPrice = Number(localStorage.getItem('CPSPrice')) || 25;
  multiplier = Number(localStorage.getItem('Multiplier')) || 1;
  multiplierPrice = Number(localStorage.getItem('MultiplierPrice')) || 100;
  const colour = localStorage.getItem('colour');
  if (colour) {
    input.value = colour;
    body.style.background = colour;
  }
}

yenCoin.addEventListener('click', () => {
  yen += multiplier;
  yenDisplay.textContent = `¥${yen.toLocaleString()}`;
  localStorage.setItem('Yen', yen);
  clickSound.currentTime = 0;
  clickSound.play(); 
});

document.addEventListener('keyup', e => {
  if (e.key === ' ' || e.code === 'Space') {
    yen += 1;
    yenDisplay.textContent = `¥${yen.toLocaleString()}`;
    localStorage.setItem('Yen', yen);
  }
});

cpsBtn.addEventListener('click', () => {
  if (yen >= cpsPrice) {
    yen -= cpsPrice;
    cps += 1;
    cpsPrice = Math.ceil(cpsPrice * 1.1);
    saveState();
    startCpsInterval();
    updateDisplays();
  }
});

multiplierBtn.addEventListener('click', () => {
  if (yen >= multiplierPrice) {
    yen -= multiplierPrice;
    multiplierPrice = Math.ceil(multiplierPrice * 1.1);
    multiplier *= 2;
    saveState();
    updateDisplays();
  }
});

input.addEventListener('change', () => {
  localStorage.setItem('colour', input.value);
  body.style.background = input.value;
});

window.addEventListener('load', () => {
  loadState();
  updateDisplays();
  startCpsInterval();
});
