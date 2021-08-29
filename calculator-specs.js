const { expect } = require('chai');
const Calculator = require('./calculator.js');

describe('Calculator', function () {
    let calculator;

    it('calculate expression', function(){
        calculator = new Calculator('1.9 + 2.8');
        const value = calculator.evaluateExpression();
        expect(value).to.be.at.most(5);	
    })

    it('calculate expression', function(){
        calculator = new Calculator('1 + 2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(3);
    })

    it('calculate expression', function(){
        calculator = new Calculator('4*5/2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(10);
    })

    it('calculate expression', function(){
        calculator = new Calculator('-5+-8--11*2');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(9);
    })

    it('calculate expression', function(){
        calculator = new Calculator('-.32       /.5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(-0.64);
    })

    it('calculate expression', function(){
        calculator = new Calculator('(4-2)*3.5');
        const value = calculator.evaluateExpression();
        expect(value).to.equal(7);
    })

    it('throws error', function(){
        calculator = new Calculator('2+-+-4');
        expect(function(){
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })

    it('throws error', function(){
        calculator = new Calculator('19 + cinnamon');
        expect(function(){
            calculator.evaluateExpression();
        }).to.throw('Invalid Input')
    })
})