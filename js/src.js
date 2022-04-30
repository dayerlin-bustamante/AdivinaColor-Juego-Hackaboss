'use strict';

//RGB generado al azar
function randomColor() {
  return Math.round(Math.random() * 255);
}

//COLOR de los BTN a valores rgb
function setBtnColor(button, red, green, blue) {
  button.setAttribute(
    'style',
    'background-color: rgb(' + red + ',' + green + ',' + blue + ');'
  );
}

// VARIABLES
const buttons = document.getElementsByClassName('btnColor');
const colorValue = document.getElementById('colorValue');
const respuesta = document.getElementById('respuesta');
const countPositivo = document.getElementById('positivo');
const countNegativo = document.getElementById('negativo');

let aciertos = 0;
let fallos = 0;

//GAME
function startGame() {
  // La variable escogera un button
  var pickedColorBtn = Math.round(Math.random() * (buttons.length - 1));
  //Generando los valores random

  // Recorro los buttons y les agrego en color random dentro dela suncion setBtnColor
  for (var i = 0; i < buttons.length; i++) {
    let red = randomColor();
    let green = randomColor();
    let blue = randomColor();
    // asignandole a los btn
    setBtnColor(buttons[i], red, green, blue);
    //  comparo si la posicion del momento en i es igual a la posicion random que escogio la variable pickedColorBtn
    if (i === pickedColorBtn) {
      colorValue.innerHTML = `RGB: ( ${red}, ${green}, ${blue})`;
    }

    // con el mismo for que recorre los botones le agrego el evento 'click' (this significa el efento click en else button[i])
    buttons[i].addEventListener('click', function () {
      //  si ese click (seleccion de un button) es diferente a el button[pickedColorBtn 'recordar que esta ver tiene un numero random de la posicion']
      if (this !== buttons[pickedColorBtn]) {
        respuesta.innerHTML = '¡Incorrecto, Inténtalo de nuevo!';
        fallos++;
        countNegativo.innerHTML = fallos;
        this.style.backgroundColor = '#fff';
      } else {
        respuesta.innerHTML = '¡Correcto!';
        aciertos++;
        countPositivo.innerHTML = aciertos;
        startGame();
      }

      if (fallos >= 3) {
        respuesta.innerHTML = '¡HAZ PERDIDO!';
        aciertos = 0;
        fallos = 0;
      } else if (aciertos >= 3) {
        respuesta.innerHTML = '¡VICTORIA!';
        aciertos = 0;
        fallos = 0;
        confetti.start();
      }
    });
  }
}

startGame();
