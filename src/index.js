// @ts-check

import Calculator from "./model/calculator.js";

/**
 * @type {HTMLElement | null}
 */
const nodeContainer = document.querySelector(".calculator-container");
if (!nodeContainer) {
  throw new Error("nodeContainer is undefined");
}

/**
 * @type {HTMLElement | null}
 */
const nodeContainerButtons = nodeContainer.querySelector(
  ".calculator-container-buttons"
);
if (!nodeContainerButtons) {
  throw new Error("nodeContainerButtons is undefined");
}

/**
 * @type {HTMLElement | null}
 */
const nodeDisplay = nodeContainer.querySelector(
  ".calculator-container-display"
);
if (!nodeDisplay) {
  throw new Error("nodeDisplay is undefined");
}

/**
 * @type {HTMLSpanElement | null}
 */
const nodePreviousDisplay = nodeDisplay.querySelector(".previous-display");
if (!nodePreviousDisplay) {
  throw new Error("nodePreviousDisplay is undefined");
}

/**
 * @type {HTMLSpanElement | null}
 */
const nodeCurrentDisplay = nodeDisplay.querySelector(".current-display");
if (!nodeCurrentDisplay) {
  throw new Error("nodeCurrentDisplay is undefined");
}
const nodeButtons = nodeContainerButtons.querySelectorAll("button");

const buttons = Array.from({ length: nodeButtons.length }, (_, i) =>
  nodeButtons.item(i)
);

const operatorButtons = buttons.filter(({ dataset }) => !!dataset.operatorBtn);
const numberButtons = buttons.filter(({ dataset }) => !!dataset.numberBtn);
/**
 * @type {HTMLButtonElement | undefined}
 */
const clearButton = buttons.find(({ dataset }) => dataset.clearBtn);
if (!clearButton) {
  throw new Error("clearButton is undefined");
}

/**
 * @type {HTMLButtonElement | undefined}
 */
const deleteButton = buttons.find(({ dataset }) => dataset.deleteBtn);
if (!deleteButton) {
  throw new Error("deleteButton is undefined");
}

/**
 * @type {HTMLButtonElement | undefined}
 */
const equalButton = buttons.find(({ dataset }) => dataset.equalBtn);
if (!equalButton) {
  throw new Error("equalButton is undefined");
}

const calculator = new Calculator(nodePreviousDisplay, nodeCurrentDisplay);

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const number = e.target.dataset.numberBtn;

    if (!number) return;

    calculator.setValue(number);
    calculator.displayInput();
  });
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const operator = e.target.dataset.operatorBtn;

    if (!operator) return;

    calculator.operation = operator;
    calculator.displayInput();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.displayInput();
});

deleteButton.addEventListener("click", () => {
  calculator.deleteValue();
  calculator.displayInput();
});

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.displayInput();
});

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ["*", "/", "+", "-"];

document.addEventListener("keydown", (e) => {
  if (numbers.includes(parseInt(e.key)) || e.key === ".") {
    calculator.setValue(e.key);
    calculator.displayInput();
    return;
  }

  if (operators.includes(e.key)) {
    switch (e.key) {
      case "*":
        calculator.operation = "multiplication";
        break;
      case "/":
        calculator.operation = "division";
        break;
      case "+":
        calculator.operation = "addition";
        break;
      case "-":
        calculator.operation = "subtraction";
        break;
    }

    calculator.displayInput();
    return;
  }

  if (e.key === "Enter") {
    calculator.calculate();
    calculator.displayInput();
    return;
  }

  if (e.key === "Backspace") {
    calculator.deleteValue();
    calculator.displayInput();
  }
});

calculator.displayInput();
