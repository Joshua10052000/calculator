// @ts-check

class Calculator {
  #stringPreviousValue;
  #stringCurrentValue;
  #operation;
  #nodePrevious;
  #nodeCurrent;

  /**
   * @param {HTMLSpanElement} nodePrevious
   * @param {HTMLSpanElement} nodeCurrent
   */
  constructor(nodePrevious, nodeCurrent) {
    this.#stringPreviousValue = "";
    this.#stringCurrentValue = "";
    this.#operation = "";
    this.#nodePrevious = nodePrevious;
    this.#nodeCurrent = nodeCurrent;
  }

  get stringPreviousValue() {
    return this.#stringPreviousValue;
  }

  get stringCurrentValue() {
    return this.#stringCurrentValue;
  }

  get operation() {
    return this.#operation;
  }

  set stringPreviousValue(value) {
    this.#stringPreviousValue = value;
  }

  set stringCurrentValue(value) {
    this.#stringCurrentValue = value;
  }

  set operation(operator) {
    this.#operation = operator;
  }

  /**
   * @param {number} n1
   * @param {number} n2
   * @returns {number}
   */
  #add(n1, n2) {
    const sum = n1 + n2;

    return sum;
  }

  /**
   * @param {number} n1
   * @param {number} n2
   * @returns {number}
   */
  #subtract(n1, n2) {
    const difference = n1 - n2;

    return difference;
  }

  /**
   * @param {number} n1
   * @param {number} n2
   * @returns {number}
   */
  #divide(n1, n2) {
    const quotient = n1 / n2;

    return quotient;
  }

  /**
   * @param {number} n1
   * @param {number} n2
   * @returns {number}
   */
  #multiply(n1, n2) {
    const product = n1 * n2;

    return product;
  }

  #getOperationIdentifier() {
    switch (this.operation) {
      case "multiplication":
        return "x";
      case "division":
        return "/";
      case "addition":
        return "+";
      case "subtraction":
        return "-";
      default:
        return "";
    }
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  #readableValue(value) {
    return "";
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  setValue(value) {
    const targetValue = this.operation
      ? this.stringCurrentValue
      : this.stringPreviousValue;

    if (targetValue.length >= 15) return;

    if (value === "0") {
      if (targetValue.length <= 1) return;
    }
    if (value === ".") {
      if (targetValue.includes(".")) return;

      const newValue = targetValue.length <= 0 ? "0." : targetValue.concat(".");

      this.operation
        ? (this.stringCurrentValue = newValue)
        : (this.stringPreviousValue = newValue);

      return;
    }

    const newValue = targetValue.concat(value);
    this.operation
      ? (this.stringCurrentValue = newValue)
      : (this.stringPreviousValue = newValue);
  }

  deleteValue() {
    const targetValue = this.operation
      ? this.stringCurrentValue
      : this.stringPreviousValue;
    const stringTargetValue = targetValue.toString();
    const newValue = stringTargetValue.slice(0, -1);
    this.operation
      ? (this.stringCurrentValue = newValue)
      : (this.stringPreviousValue = newValue);
  }

  clear() {
    this.stringPreviousValue = "";
    this.#stringCurrentValue = "";
    this.operation = "";
  }

  calculate() {
    if (!this.operation) return;
    const previousValue = isNaN(parseFloat(this.stringPreviousValue))
      ? 0
      : parseFloat(this.stringPreviousValue);
    const currentValue = isNaN(parseFloat(this.stringCurrentValue))
      ? 0
      : parseFloat(this.stringCurrentValue);

    switch (this.operation) {
      case "addition":
        const sum = this.#add(previousValue, currentValue);
        this.stringPreviousValue = sum.toString();
        this.stringCurrentValue = "";

        break;
      case "subtraction":
        const difference = this.#subtract(previousValue, currentValue);

        this.stringPreviousValue = difference.toString();
        this.stringCurrentValue = "";

        break;
      case "division":
        const quotient = this.#divide(previousValue, currentValue);
        this.stringPreviousValue = quotient.toString();
        this.stringCurrentValue = "";

        break;
      case "multiplication":
        const product = this.#multiply(previousValue, currentValue);

        this.stringPreviousValue = product.toString();
        this.stringCurrentValue = "";

        break;
      default:
        throw new Error("Unrecognized operation");
    }
  }

  displayInput() {
    const operationIdentifier = this.#getOperationIdentifier();
    const previousValue =
      this.stringPreviousValue.length <= 0 ? "0" : this.stringPreviousValue;
    const currentValue =
      this.stringCurrentValue.length <= 0 ? "0" : this.stringCurrentValue;

    /**
     * @param {string} value
     * @returns {`${string}rem`}
     */
    const getFontSize = (value) => {
      const stringValue = value.toString();
      if (stringValue.length >= 10) {
        return "2rem";
      }
      if (stringValue.length >= 5) {
        return "3.5rem";
      }
      return "5rem";
    };

    this.#nodeCurrent.style.fontSize = getFontSize(this.stringCurrentValue);

    this.#nodePrevious.textContent = `${previousValue} ${operationIdentifier}`;
    this.#nodeCurrent.textContent = `${currentValue}`;
  }
}

export default Calculator;
