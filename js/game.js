'use strict';

const buttons = document.getElementsByClassName('btnColor');
const colorValue = document.getElementById('colorValue');
const respuesta = document.getElementById('respuesta');
const reset = document.getElementById('btnReset');
const countPositivo = document.getElementById('positivo');
const countNegativo = document.getElementById('negativo');

let aciertos = 0;
let fallos = 0;

function generateRandomNumber() {
  return Math.floor(Math.random() * 256);
}

function generateRandomColor() {
  const red = generateRandomNumber();
  const green = generateRandomNumber();
  const blue = generateRandomNumber();
  return `rgb(${red}, ${green}, ${blue})`;
}

function generateDifferentColor() {
  let randomColor = generateRandomColor();
  while (randomColor === colorValue.innerHTML.toLowerCase()) {
    randomColor = generateRandomColor();
  }
  return randomColor;
}

function paintButtons() {
  const rightBall = Math.floor(Math.random() * 4);
  for (let i = 0; i < buttons.length; i++) {
    if (i === rightBall) {
      buttons[i].style.backgroundColor = colorValue.innerHTML.toLowerCase();
    } else {
      buttons[i].style.backgroundColor = generateDifferentColor();
    }
  }
}

function chooseColor(event) {
  const ganador = event.target;

  if (respuesta.innerHTML === '¡Correcto!') {
    alert('Cambia los colores!');
  } else if (
    ganador.style.backgroundColor === colorValue.innerHTML.toLowerCase()
  ) {
    respuesta.innerHTML = '¡Correcto!';
    aciertos++;
    countPositivo.innerHTML = aciertos;
    onLoadPage();
  } else {
    respuesta.innerHTML = 'Incorrecto! Intenta de Nuevo';
    fallos++;
    countNegativo.innerHTML = fallos;
    this.style.backgroundColor = '#fff';
    if (fallos === 3) {
      respuesta.innerHTML = '¡HAZ PERDIDO!';
      window.location.replace('./perdiste.html');
    }
  }
}

function addEventListenerToBalls() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', chooseColor);
  }
}

function onLoadPage() {
  if (aciertos === 3) {
    respuesta.innerHTML = '¡VICTORIA!';
    window.location.replace('./ganaste.html');
  }
  colorValue.innerHTML = generateRandomColor().toUpperCase();
  addEventListenerToBalls();
  paintButtons();
  respuesta.innerHTML = 'Elige un Color';
}

window.onload = onLoadPage;
