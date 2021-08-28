const { expect, assert } = require('chai');
const Calculator = require('./calculator.js');

describe('Calculator', function () {
    let calculator;

    it('adds two whole numbers', function () {
       
        calculator = new Calculator('1 + 5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(6);
    });

    it('adds two decimal numbers', function () {
       
        calculator = new Calculator('1.6 + 5.7');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(7.3);
    });
})