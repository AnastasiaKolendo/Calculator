class Calculator {
    constructor(str) {
        this.str = str;
        this.value = '';
        this.parsedArray = [];
    }

    evaluateExpression(stack) {
        let result = 0;

        if (stack.length > 0) {
            result = stack.pop();
        }

        while (stack.length > 0 && stack[stack.length - 1] !== ')') {
            const sign = stack.pop();
            const operand = stack.pop();
            result = this.calculate(result, sign, operand)
        }

        this.stack.pop();
        return result;
    }

    calculateValue() {
        const stack = [];

        for (let i = this.parsedArray.length - 1; i >= 0; i--) {
            if (this.parsedArray[i] === '(') {
                let result = evaluateExpression(stack);
                stack.pop();
                stack.push(result);
            } else if (this.parsedArray[i] === ')') {

            }
        }
    }

    calculate(operand1, operator, operand2) {
        let result;
        if (operator === '-') {
            result = operand1 - operand2;
        } else if (operator === '+') {
            result = operand1 + operand2;
        } else if (operator === '*') {
            result = operand1 * operand2
        } else {
            result = operand1 / operand2;
        }
    }

    parseString() {
        const array = [];
        const s = this.str.replace(/\s/g, "");

        try {
            for (let i = 0; i < s.length; i++) {
                if (s[i] === '*' || s[i] === '/' || s[i] === '(' || s[i] === ')') {
                    array.push(s[i]);
                } else if ((s[i] === '-' && s[i - 1] !== '-' && s[i - 1] !== '+' && s[i - 1] !== '*' && s[i - 1] !== '/' && i !== 0) || s[i] === '+') {

                    array.push(s[i]);

                } else {

                    const floatNum = Number.parseFloat(s.slice(i));
                    const num = Number.parseInt(s.slice(i));

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
            this.parsedArray = array;
        } catch (error) {
            console.log(error.message)
        }
        
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your expression, please: ", function (answer) {
    const calculator = new Calculator(answer);
    calculator.parseString();
    rl.close()
});

