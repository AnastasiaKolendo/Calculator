class Calculator {
    constructor(expression) {
        this.expression = expression;
        this.openParentheses = 0;
    }

    evaluateExpression() {
        const arrayExpression = this.parseExpression();

        if (arrayExpression.length === 0) return 0;

        const numbers = [];
        const operations = [];

        for (let i = 0; i < arrayExpression.length; i++) {

            if (!isNaN(arrayExpression[i])) {
                numbers.push(arrayExpression[i]);

            } else if (arrayExpression[i] === '(') {
                operations.push('(');

            } else if (arrayExpression[i] === ')') {

                while (operations[operations.length - 1] !== '(') {

                    numbers.push(this.calculate(numbers.pop(), operations.pop(), numbers.pop()))

                }
                operations.pop();

            } else {
                while (operations.length > 0 && this.checkPrecedence(arrayExpression[i], operations[operations.length - 1])) {
                    numbers.push(this.calculate(numbers.pop(), operations.pop(), numbers.pop()))
                }
                operations.push(arrayExpression[i]);

            }
        }

        while (operations.length !== 0) {
            numbers.push(this.calculate(numbers.pop(), operations.pop(), numbers.pop()))
        }
        return numbers.pop();
    }

    checkPrecedence(operator1, operator2) {
        if (operator2 === '(' || operator2 === ')') return false;
        if ((operator1 === '*' || operator1 === '/') && (operator2 === '+' || operator2 === '-')) return false;
        return true;
    }

    calculate(operand1, operator, operand2) {
        if (operator === '-') return operand1 - operand2;
        if (operator === '+') return operand1 + operand2;
        if (operator === '*') return operand1 * operand2;
        else return operand1 / operand2;
    }

    parseExpression() {
        const array = [];
        const expression = this.expression.replace(/\s/g, "");

        try {
            for (let i = 0; i < expression.length; i++) {
                
                if (expression[i] === '(' || expression[i] === ')') {
                    if (this.validateParentheses(expression[i], expression[i + 1])) {
                        array.push(expression[i]);
                    } else {
                        throw new Error('Invalid Syntax');
                    }
                } else if (expression[i] === '*' || expression[i] === '/' || expression[i] === '+') {

                    if (i === 0 || i === expression.length - 1 || expression[i + 1] === '/' || expression[i + 1] === '*' || expression[i + 1] === '+') {
                        throw new Error('Invalid Syntax');
                    }
                    array.push(expression[i]);

                } else if (expression[i] === '-' && expression[i + 1] === '-' && (expression[i + 2] === '+' || expression[i + 2] === '-' || expression[i + 2] === '*' || expression[i + 2] === '/'
                    || expression[i + 2] === '(' || expression[i + 2] === ')' || i + 1 === expression.length - 1 || i === 0)) {
                    throw new Error('Invalid Syntax');
                } else if (expression[i] === '-' && expression[i - 1] !== '+' && expression[i - 1] !== '*' && expression[i - 1] !== '-' && expression[i - 1] !== '/' && i > 0) {
                    array.push(expression[i], );
                } else {
                    const floatNum = Number.parseFloat(expression.slice(i));
                    const num = Number.parseInt(expression.slice(i));

                    if (isNaN(num) && isNaN(floatNum)) {
                        throw new Error('Invalid Input');
                    }

                    if (num !== floatNum) {
                        array.push(floatNum);
                        i = i + String(floatNum).length - 1;
                    } else {
                        array.push(num);
                        i = i + String(num).length - 1;
                    }
                }
            }
            
            return array;
        } catch (error) {
            console.log(error.message)
        }
    }

    validateParentheses(parenthesis, nextElement) {
        if (nextElement === '(' || nextElement === ')' ||
            (parenthesis === ')' && this.openParentheses === 0)) return false;

        if (parenthesis === '(') this.openParentheses++;
        else this.openParentheses--;

        return true;
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your expression, please: ", function (input) {
    const calculator = new Calculator(input);
    const value = calculator.evaluateExpression();
    console.log('Answer: ' + value);
    rl.close()
});

