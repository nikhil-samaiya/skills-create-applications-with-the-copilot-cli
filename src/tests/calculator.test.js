const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('calculator', () => {
  describe('addition', () => {
    test('adds the example operands', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('handles negative and decimal operands', () => {
      expect(calculate(-2.5, '+', 1.5)).toBe(-1);
    });

    test('adds zero without changing the operand', () => {
      expect(calculate(7, '+', 0)).toBe(7);
    });
  });

  describe('subtraction', () => {
    test('subtracts the example operands', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('handles negative results', () => {
      expect(calculate(4, '-', 10)).toBe(-6);
    });

    test('subtracts decimal operands', () => {
      expect(calculate(5.5, '-', 2.25)).toBeCloseTo(3.25);
    });
  });

  describe('multiplication', () => {
    test('multiplies the example operands', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('handles multiplication by zero', () => {
      expect(calculate(45, '*', 0)).toBe(0);
    });

    test('multiplies negative operands', () => {
      expect(calculate(-3, '*', -4)).toBe(12);
    });
  });

  describe('division', () => {
    test('divides the example operands', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('returns a fractional result when needed', () => {
      expect(calculate(5, '/', 2)).toBe(2.5);
    });

    test('handles negative operands', () => {
      expect(calculate(-12, '/', 3)).toBe(-4);
    });

    test('rejects division by zero', () => {
      expect(() => calculate(5, '/', 0)).toThrow('Division by zero is not allowed.');
    });
  });

  describe('modulo', () => {
    test('returns the remainder of two numbers', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('handles negative operands', () => {
      expect(modulo(-10, 3)).toBe(-1);
    });

    test('rejects modulo by zero', () => {
      expect(() => modulo(10, 0)).toThrow('Modulo by zero is not allowed.');
    });
  });

  describe('power', () => {
    test('raises a base to an exponent', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('supports zero and negative exponents', () => {
      expect(power(5, 0)).toBe(1);
      expect(power(2, -2)).toBe(0.25);
    });
  });

  describe('square root', () => {
    test('returns the square root of a number', () => {
      expect(squareRoot(81)).toBe(9);
    });

    test('returns zero for zero', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('rejects square root of a negative number', () => {
      expect(() => squareRoot(-1)).toThrow(
        'Square root of a negative number is not allowed.',
      );
    });
  });

  describe('input validation', () => {
    test('rejects non-finite operands', () => {
      expect(() => calculate(Number.NaN, '+', 1)).toThrow(
        'Both operands must be valid numbers.',
      );
      expect(() => calculate(1, '+', Infinity)).toThrow(
        'Both operands must be valid numbers.',
      );
    });

    test('rejects unsupported operators', () => {
      expect(() => calculate(2, '&', 3)).toThrow(
        'Supported operators are +, -, *, /, %, and ^.',
      );
    });
  });
});
