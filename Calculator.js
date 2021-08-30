class Calculator {
    constructor(expression) {
        this.expression = expression;
    }

    evaluateExpression() {
        let tokens = this.parseExpression();
        if (tokens.length === 0) throw new Error('Invalid Input');

        const value = this.evaluateTokens(tokens);
        if(tokens.length > 0) throw new Error('Invalid Input');
        return value;
    }

    evaluateTokens(tokens) {
        const stack = [];
        let operator = '+';
        let num = null;

        while (tokens.length > 0 && tokens[0] !== ')') {
            let token = tokens.shift();
           
            if (!isNaN(token)) {
                num = token;
            } else if (token === '(') {
                num = this.evaluateTokens(tokens);

                if(tokens[0] !== ')')  throw new Error('Invalid Input');
                tokens.shift();
            } else {
                this.calculate(operator, stack, num);
                num = null;
                operator = token;
            }
        }
        this.calculate(operator, stack, num);
        let value = 0;
        
        while (stack.length > 0) {
            value += stack.pop();
        }
        
        return value;
    }

    calculate(operator, stack, num) {
        if (num === null) throw new Error('Invalid Input');
        if (operator === '+') {
            stack.push(num);
        } else if (operator === '-') {
            stack.push(-num);
        } else if (operator === '*') {
            let prevNum = stack.pop();
            stack.push(num * prevNum);
        } else if (operator === '/') {
            let prevNum = stack.pop();
            stack.push(prevNum / num);
        }
    }

    parseExpression() {
        const array = [];
        this.removeSpaces();
        let i = 0;
        const arithmeticMinusPredecessors = ['+', '-', '(', '/', '*'];
        const nonMinusOperators = ['*', '/', '+', '(', ')'];

        while (i < this.expression.length) {

            if (this.expression[i] === '-' && i !== 0 && !arithmeticMinusPredecessors.includes(this.expression[i - 1])) {
                array.push(this.expression[i]);
                i++;
            } else if (nonMinusOperators.includes(this.expression[i])) {
                array.push(this.expression[i]);
                i++;
            } else {
                let j = i;

                if (this.expression[j] === '-') {
                    j = i + 1
                }

                while (this.expression[j] === '.' || !isNaN(this.expression[j])) {
                    j++;
                }

                const numString = this.expression.slice(i, j);
                const num = Number.parseFloat(numString);

                if (isNaN(num)) {
                    throw new Error('Invalid input at ' + this.expression.slice(i));
                }

                array.push(num);
                i = j;
            }
        }

        return array;
    }

    removeSpaces() {
        this.expression = this.expression.split('').filter(el => el !== ' ').join('');
    }

}

module.exports = Calculator



