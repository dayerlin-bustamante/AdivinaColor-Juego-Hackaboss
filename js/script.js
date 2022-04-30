'use strict';

const buttons = document.getElementsByClassName('btnColor');
const colorValue = document.getElementById('colorValue');
const respuesta = document.getElementById('respuesta');
const reset = document.getElementById('btnReset');
const countPositivo = document.getElementById('positivo');
const countNegativo = document.getElementById('negativo');

let aciertos = 0;
let falloos = 0;

let colors = [];
ramdonColor();
setBtnColors();
// checkColor();
function ramdonColor() {
  for (let i = 0; i < buttons.length; i++) {
    colors.push(
      `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`
    );
  }
}

function setBtnColors() {
  colors.forEach((color, index) => {
    buttons[index].style.background = color;
    buttons[index].setAttribute('data-color', color);
  });
}

function RandomPickedColors() {
  const colorRandomValue = colors[Math.floor(Math.random() * colors.length)];
  colorValue.innerHTML = colorRandomValue;
  return colorRandomValue;
}
let pickedColor = RandomPickedColors();

function checkColor() {
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.dataset.color === pickedColor) {
        respuesta.innerHTML = '¡CORRECTO!';
      } else {
        respuesta.innerHTML = 'INCORRECTO';
        e.target.classList.add('of');
      }
    });
  });
}
