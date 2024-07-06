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
    calcOperator = calcDisplayValue.split('').find(op => OPERATORS.includes(op));
    if (calcOperator == undefined) {
        return null;
    }

    const operands = calcDisplayValue.split(/[-+*%/]/);
    calcFirstValue = +operands[0];
    if (calcOperator !== '%')
        calcSecondValue = +operands[1];
    return true;
}

function operate(op, a, b) {
    if (OPERATORS.includes(op)) {
        switch(op) {
            case "+": return Math.round(addition(a, b));
            case "-": return Math.round(subtract(a, b));
            case "*": return Math.round(multiply(a, b));
            case "/": return Math.round(divide(a, b));
            case "%": return percentage(a);
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
                calcDisplayValue += target.textContent;
            }

            //Operadores
            if (OPERATORS_IDS.includes(target.id)) {
                //Si y solo si ya hay un número
                if (!isNumberNeeded) {
                    calcDisplayValue += target.textContent;
                    isNumberNeeded = true;
                }
            }
        }
    }

    showResultText();
});