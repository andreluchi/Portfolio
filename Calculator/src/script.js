import './style.css';

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;

    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (Number.isNaN(prev) || Number.isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        if (computation > 10 ** 9) {
          computation = Number.NaN;
        }
        break;
      case '-':
        computation = prev - current;
        if (computation < 0) {
          computation = Number.NaN;
        }
        break;
      case '*':
        computation = prev * current;
        if (computation > 10 ** 9) {
          computation = Number.NaN;
        }
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    if (Number.isNaN(computation)) {
      this.currentOperand = 'ERROR***';
    } else if (computation % 1 !== 0) {
      this.currentOperand = computation.toFixed(7);
    } else {
      this.currentOperand = computation.toString();
    }

    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber() {
    const number = this.currentOperand;
    let stringNumber = number.toString();

    if (stringNumber.length > 9) {
      stringNumber = stringNumber.substr(0, 9);
    }

    let integerDisplay;

    if (stringNumber.includes('ERROR***')) {
      integerDisplay = 'ERROR***';
      return integerDisplay;
    }

    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    if (Number.isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }

    return integerDisplay;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber();

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber()} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
