const { expect } = require('chai');
const Calculator = require('./calculator.js');

describe('Calculator', function () {
    let calculator;

    it('adds whole numbers', function () {
        calculator = new Calculator('1+2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(3);
    })

    it('substructs whole numbers', function () {
        calculator = new Calculator('16-2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(14);
    })

    it('adds decimal numbers', function () {
        calculator = new Calculator('1.9 + 2.8');
        const value = calculator.evaluateExpression();
        expect(value).to.be.at.most(5);
    })

    it('substructs decimal numbers', function () {
        calculator = new Calculator('1.9-2.8');
        const value = calculator.evaluateExpression();
        expect(value).to.be.at.most(-0.8);
    })


    it('adds and substructs numbers', function () {
        calculator = new Calculator('16-2+3');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(17);
    })

    it('multiplies whole numbers', function () {
        calculator = new Calculator('11*2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(22);
    })

    it('devides whole numbers', function () {
        calculator = new Calculator('33/3');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(11);
    })

    it('divides decimal numbers', function () {
        calculator = new Calculator('33.3/3');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(11.1);
    })

    it('fails when devided by zero', function () {
        calculator = new Calculator('2/0');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw("Invalid Input. You can't devide by zero")
    })

    it('multiplies decimal numbers', function () {
        calculator = new Calculator('33.3*3');
        const value = calculator.evaluateExpression();
        expect(value).to.be.at.most(99.9);
    })

    it('multiplies and divides', function () {
        calculator = new Calculator('4*5/2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(10);
    })

    it('multiplies, divides, substructs and adds', function () {
        calculator = new Calculator('3+6*4/3-5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(6);
    })

    it('devides decimal negative and positive decimal numbers', function () {
        calculator = new Calculator('-.32/.5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(-0.64);
    })

    it('supports unary minus', function () {
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

    it('fails when the second operator is not unary minus', function () {
        calculator = new Calculator('2++4');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it('supports parentheses', function () {
        calculator = new Calculator('(4-2)*3.5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(7);
    })

    it('supports nested parentheses', function () {
        calculator = new Calculator('(4-2)*(3.5+(4-3))');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(9);
    })

    it('fails when the parentheses are not balanced on the right', function () {
        calculator = new Calculator('2+4)');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it('fails when the parentheses are not balanced on the left', function () {
        calculator = new Calculator('(2+4');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it('fails when the input has invalid characters', function () {
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

    it('fails when the expression is empty', function () {
        calculator = new Calculator('');
        expect(function () {
            calculator.evaluateExpression();
        }).to.throw('Invalid Input. You entered an empty string');
    })

    it('removes spaces in the original expression', function () {
        calculator = new Calculator('-.32       /.5');
        calculator.evaluateExpression();
        expect(calculator.expression).to.equal('-.32/.5');
    })

})
