'use strict';
/* VARIABLES */
const buttons = document.getElementsByClassName('btnColor');
const colorValue = document.getElementById('colorValue');
const respuesta = document.getElementById('respuesta');
const reset = document.getElementById('btnReset');
const countPositivo = document.getElementById('positivo');
const countNegativo = document.getElementById('negativo');
/* CONTADOR */
let aciertos = 0;
let fallos = 0;
/* RANDOM COLORES */
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

/* COLORES A LOS BUTTONS */
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

/* ELECCION DEL GANADOR Y LAS CONDICIONES */
function chooseColor(event) {
  //Almaceno en ganador el rgb ganador
  const ganador = event.target;

  if (respuesta.innerHTML === '¡Correcto!') {
    alert('Cambia los colores!');
  } else if (
    ganador.style.backgroundColor === colorValue.innerHTML.toLowerCase()
  ) {
    respuesta.innerHTML = '¡Correcto!';
    aciertos++;
    countPositivo.innerHTML = aciertos;
    // Si es correcto llamo la funcion startGame para darle nuevos colores y evalua la condicion.
    startGame();
  } else {
    respuesta.innerHTML = 'Incorrecto! Intenta de Nuevo';
    fallos++;
    countNegativo.innerHTML = fallos;
    this.style.backgroundColor = '#fff';
    if (fallos === 3) {
      respuesta.innerHTML = '¡HAZ PERDIDO!';
      //llamo al html
      window.location.replace('./perdiste.html');
    }
  }
}
/* ASIGNO EL EVENTO CLICK */
function addEventListenerToBalls() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', chooseColor);
  }
}

/* FUNCION PARA EL START GAME */
function startGame() {
  if (aciertos === 3) {
    respuesta.innerHTML = '¡VICTORIA!';
    // llamo a al html
    window.location.replace('./ganaste.html');
  }
  colorValue.innerHTML = generateRandomColor().toUpperCase();
  addEventListenerToBalls();
  paintButtons();
  respuesta.innerHTML = 'Elige un Color';
}

window.onload = startGame;
