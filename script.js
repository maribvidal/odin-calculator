"use strict";

//  - GLOBAL VARIABLES

const OPERATORS = ['+', '-', '*', '/', '%'];
const OPERATORS_IDS = ['add', 'subtract', 'multiply', 'divide', 'percentage'];
const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const RESULT_WIDTH = 16;

const calculator = document.querySelector(".calculator");
const calcKeyResult = document.querySelector("#result");

let calcPrevResult = 0;
let calcFirstValue = 0;
let calcOperator;
let calcSecondValue = 0;
let calcDisplayValue = '';

let isNumberNeeded = true;

//  - FUNCTIONS

function isNumber(value) {return typeof value === 'number';}

//* Utilty: returns an array with the 3 elements of the operation, or null
function checkOperation() {
    calcOperator = OPERATORS[OPERATORS_IDS.findIndex(name => name === calcOperator)];
    if (calcOperator == undefined) {
        return null;
    }

    calcSecondValue = Number(calcDisplayValue);
    return true;
}

function operate(op, a, b) {
    if (OPERATORS.includes(op)) {
        switch(op) {
            case "+": return addition(a, b).toFixed(1);
            case "-": return subtract(a, b).toFixed(1);
            case "*": return multiply(a, b).toFixed(1);
            case "/": return divide(a, b).toFixed(1);
            case "%": return percentage(a).toFixed(1);
            default: break;
        }
    }
    return null;
}

function showResultText() {
    calcKeyResult.textContent = calcDisplayValue;
}

//  Operaciones básicas

function addition(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {return a / b;}
function percentage(a) {return a / 100;}

//  - LÓGICA DEL PROGRAMA
calculator.addEventListener("click", (event) => {
    let target = event.target;

    if (target.id !== '' && target.id !== 'result') {
        // Si decidimos pulsar el boton 'C'
        if (target.id === 'ac') {
            calcDisplayValue = '';
            isNumberNeeded = true;
            calcOperator = '';
            calcPrevResult = 0;
            calcFirstValue = 0;
            calcSecondValue = 0;
        } else if (target.id === 'rm') {
            //Revisar si calcDisplayValue no está vacío
            if (calcDisplayValue.length > 0) {
                calcDisplayValue = calcDisplayValue.substring(0, calcDisplayValue.length - 1);
                //Revisar si el último carácter ahora es un operador
                if (OPERATORS.includes(calcDisplayValue.substring(calcDisplayValue.length - 1, calcDisplayValue.length))) {
                    isNumberNeeded = true;
                }
            }
        } else if (target.id == 'equal') {
            //Primero comprobar si todo está en regla
            if (checkOperation()) {
                calcPrevResult = operate(calcOperator, calcFirstValue, calcSecondValue);
                calcDisplayValue = calcPrevResult;
                isNumberNeeded = false;
                calcOperator = '';
                calcFirstValue = 0;
                calcSecondValue = 0;
            }
        } else if (target.id == 'point') {
            calcDisplayValue += '.';
        } else {
            //Números
            if (NUMBERS.includes(target.id)) {
                //Si antes no había ningún número puesto...
                if (isNumberNeeded) {isNumberNeeded = false;}
                if (calcFirstValue !== 0 && calcSecondValue === 0) {
                    calcDisplayValue = '';
                    calcSecondValue = calcDisplayValue;
                }
                calcDisplayValue += target.textContent;
            }

            //Operadores
            if (OPERATORS_IDS.includes(target.id)) {
                //Si y solo si ya hay un número
                if (!isNumberNeeded) {
                    calcFirstValue = Number(calcDisplayValue);
                    calcOperator = target.id;
                    isNumberNeeded = true;
                }
            }
        }
    }

    showResultText();
});

// Keyboard support

document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    if (keyName == 0 || keyName == 1 || keyName == 2 || keyName == 3 || keyName == 4 || keyName == 5 || keyName == 6 || keyName == 7 || keyName == 8 || keyName == 9) {
        if (isNumberNeeded) {isNumberNeeded = false;}
        if (calcFirstValue !== 0 && calcSecondValue === 0) {
            calcDisplayValue = '';
            calcSecondValue = calcDisplayValue;
        }
        calcDisplayValue += keyName;
    } else if (OPERATORS.includes(keyName)) {
        if (!isNumberNeeded) {
            calcFirstValue = Number(calcDisplayValue);
            calcOperator = target.id;
            isNumberNeeded = true;
        }
    } else if (keyName == 'Backspace') {
        //Revisar si calcDisplayValue no está vacío
        if (calcDisplayValue.length > 0) {
            calcDisplayValue = calcDisplayValue.substring(0, calcDisplayValue.length - 1);
            //Revisar si el último carácter ahora es un operador
                if (OPERATORS.includes(calcDisplayValue.substring(calcDisplayValue.length - 1, calcDisplayValue.length))) {
                    isNumberNeeded = true;
                }
        }
    } else if (keyName == '=') {
        if (checkOperation()) {
            calcPrevResult = operate(calcOperator, calcFirstValue, calcSecondValue);
            calcDisplayValue = calcPrevResult;
            isNumberNeeded = false;
            calcOperator = '';
            calcFirstValue = 0;
            calcSecondValue = 0;
        }
    }
    showResultText();
});