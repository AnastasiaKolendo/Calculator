class Calculator {
    constructor(expression) {
        this.expression = expression;
        this.value = '';
        this.arrayExpression = [];
        this.openParentheses = 0;
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

    parseExpression() {
        const array = [];
        const expression = this.expression.replace(/\s/g, "");

        try {
            for (let i = 0; i < expression.length; i++) {

                if(expression[i] === '(' || expression[i] === ')'){
                    if(this.validateParentheses(expression[i], expression[i + 1])){
                        array.push(expression[i]);
                    } else {
                        throw new Error('Invalid Syntax');
                    }
                } 

                if (expression[i] === '*' || expression[i] === '/' || expression[i] === '+') {

                    if(expression[i + 1] === '/' || expression[i + 1] === '*' || expression[i + 1] === '+'){
                        throw new Error('Invalid Syntax');
                    }

                    array.push(expression[i]);

                } 
                
                if ((expression[i] === '-' && expression[i - 1] !== '-' && expression[i - 1] !== '+' && expression[i - 1] !== '*' && expression[i - 1] !== '/' && i !== 0)) {

                    array.push(s[i]);

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
            this.arrayExpression = array;
            console.log(this.arrayExpression)
        } catch (error) {
            console.log(error.message)
        }
        
    }

    validateParentheses(parenthesis, nextElement){
        if(nextElement === '(' || nextElement === ')' || (parenthesis === ')' && this.openParentheses === 0)){
            return false;
        }

        if(eparenthesis === '('){
            openParentheses++;
        } else {
            openParentheses--;
        }
        return true;
    }
}

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your expression, please: ", function (answer) {
    const calculator = new Calculator(answer);
    calculator.parseExpression();
    rl.close()
});

