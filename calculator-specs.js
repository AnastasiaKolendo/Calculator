const { expect } = require('chai');
const Calculator = require('./calculator.js');

describe('Calculator', function () {
    let calculator;

    it('adds numbers', function () {
        calculator = new Calculator('1 + 2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(3);
    })

    it('substructs numbers', function () {
        calculator = new Calculator('16 - 2 - 3');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(11);
    })

    it('adds and substructs', function () {
        calculator = new Calculator('16 - 2 + 3');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(17);
    })

    it('multiplies numbers', function () {
        calculator = new Calculator('11 * 2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(22);
    })

    it('devides numbers', function () {
        calculator = new Calculator('33 / 3');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(11);
    })

    it('multiplis and devides', function () {
        calculator = new Calculator('4*5/2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(10);
    })

    it('multiplis, devides, substructs and adds', function () {
        calculator = new Calculator('6 * 4 / 3 - 3 + 5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(10);
    })

    it('supports decimal numbers', function () {
        calculator = new Calculator('1.9 + 2.8');
        const value = calculator.evaluateExpression();
        expect(value).to.be.at.most(5);
    })

    it('supports decimal negative numbers', function () {
        calculator = new Calculator('-.32       /.5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(-0.64);
    })

    it('supports positive and negative numbers', function () {
        calculator = new Calculator('-5+-8--11*2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(9);
    })

    it('fails when there are more than 2 operators in series', function () {
        calculator = new Calculator('2+-+-4');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid input at -+-4')
    })

    it('fails when the second operator is not -', function () {
        calculator = new Calculator('2++4');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it("calculates a value when the second operator is '-'", function () {
        calculator = new Calculator('2+-4');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(-2);
    })

    it('supports parentheses', function () {
        calculator = new Calculator('(4-2)*3.5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(7);
    })

    it('fails when the parentheses are not balanced', function () {
        calculator = new Calculator('2+4)');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it('fails when the input is invalid', function () {
        calculator = new Calculator('19 + cinnamon');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid input at cinnamon')
    })

    it('fails when the beggining of the expression is invalid', function () {
        calculator = new Calculator('+2+4');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it('fails when the end of the expression is invalid', function () {
        calculator = new Calculator('2+4-');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })
})
