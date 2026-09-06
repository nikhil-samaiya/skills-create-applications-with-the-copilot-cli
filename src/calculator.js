#!/usr/bin/env node

/**
 * A CLI calculator supporting basic arithmetic and extended operations:
 * addition (+), subtraction (-), multiplication (*), division (/),
 * modulo (%), power (^), and square root (sqrt).
 */

function modulo(left, right) {
  if (right === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(value);
}

const operations = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  '/': (left, right) => {
    if (right === 0) {
      throw new Error('Division by zero is not allowed.');
    }

    return left / right;
  },
  '%': modulo,
  '^': power,
};

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

  const operation = operations[operator];
  if (!operation) {
    throw new Error('Supported operators are +, -, *, /, %, and ^.');
  }

  return operation(left, right);
}

function main() {
  const [, , leftInput, operator, rightInput] = process.argv;
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (leftInput === undefined || operator === undefined || rightInput === undefined) {
    console.error('Usage: node src/calculator.js <number> <operator> <number>');
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(left, operator, right));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { calculate, modulo, power, squareRoot };
