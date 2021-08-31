class Calculator {
    constructor(expression) {
        this.expression = expression;
    }

    evaluateExpression() {
        let tokens = this.tokenizeExpression();

        if (tokens.length === 0) throw new Error('Invalid input. You entered an empty string');
        if (isNaN(tokens[tokens.length - 1]) && tokens[tokens.length - 1] !== ')') throw new Error('Invalid arithmetic syntax');
        if (isNaN(tokens[0]) && tokens[0] !== '(' && tokens[0] !== '-') throw new Error('Invalid arithmetic syntax');

        const value = this.evaluateTokens(tokens);
        if (tokens.length > 0) throw new Error('Invalid input. The parentheses are not balanced on the right');
        return value;
    }

    evaluateTokens(tokens) {
        const stack = [];
        let currMutationOperator = '+';
        let operatorsInSeries = [];

        while (tokens.length > 0 && tokens[0] !== ')') {
            let token = tokens.shift();

            if (token === '(') {
                const subExpressionValue = this.evaluateTokens(tokens);

                if (tokens.shift() !== ')') {
                    throw new Error('Invalid input. The parentheses are not balanced on the left');
                }

                this.addMutation(currMutationOperator, stack, subExpressionValue, operatorsInSeries);
                operatorsInSeries = [];

            } else if (!isNaN(token)) {
                this.addMutation(currMutationOperator, stack, token, operatorsInSeries);
                operatorsInSeries = [];

            } else {
                currMutationOperator = token;
                operatorsInSeries.push(token);

                if (operatorsInSeries.length === 2 && token !== '-' && tokens[0] !== '(') {
                    throw new Error('Invalid arithmetic syntax');
                }
            }
        }

        const value = this.calculateValue(stack);
        return value;
    }

    calculateValue(stack) {
        const mutation = stack.pop();
        let value = mutation[1];
        let operator = mutation[0];

        while (stack.length > 0) {
            const prevMutation = stack.pop();
            const prevMutationOperand = prevMutation[1];
            const prevMutationOperator = prevMutation[0];

            value = this.calculate(value, operator, prevMutationOperand);
            operator = prevMutationOperator;
        }
        
        return value;
    }

    addMutation(currMutationOperator, stack, token, operatorsInSeries) {

        if (operatorsInSeries.length === 2) {
            token = this.calculate(token, '*', -1);
            currMutationOperator = operatorsInSeries[0];
        }

        const currMutationPriority = this.getPriority(currMutationOperator);

        if (stack.length > 0 && this.getPriority(stack[stack.length - 1][0]) <= currMutationPriority) {

            if (currMutationOperator === '-') {
                currMutationOperator = '+';
                token = this.calculate(token, '*', -1);

            } else if (currMutationOperator === '/') {
                const operand2 = this.calculate(token, '/', 1);
                const prevMutation = stack.pop();
                currMutationOperator = prevMutation[0];
                const operand1 = prevMutation[1];
                token = this.calculate(operand1, '*', operand2);
            }

        } else if (stack.length > 0 ){
            while (currMutationPriority !== this.getPriority(stack[stack.length - 1][0])) {

                const previousMutation = stack.pop();
                const previousMutationOperator1 = previousMutation[0];
                const previousMutationOperand1 = previousMutation[1];
    
                const nextPreviousMutation = stack.pop();
                const previousMutationOperator2 = nextPreviousMutation[0];
                const previousMutationOperand2 = nextPreviousMutation[1];
    
                const value = this.calculate(previousMutationOperand1, previousMutationOperator1, previousMutationOperand2);
                stack.push([previousMutationOperator2, value]);
            }
        }

        stack.push([currMutationOperator, token]);
    }

    getPriority(operator) {
        if (operator == '-' || operator == '+') {
            return 1;
        } else if (operator == '/' || operator == '*') {
            return 2;
        }
    }

    calculate(operand1, operator, operand2) {
        let value = 0;

        if (operator === '+') {
            value = operand1 + operand2;
        } else if (operator === '-') {
            value = operand2 - operand1;
        } else if (operator === '*') {
            value = operand1 * operand2;
        } else if (operator === '/') {

            if (operand1 === 0) {
                throw new Error("Invalid input. You can't devide by zero");
            }
            value = operand2 / operand1;
        }

        return value;
    }

    tokenizeExpression() {
        this.removeSpaces();

        const tokens = [];
        const arithmeticMinusPredecessors = ['+', '-', '(', '/', '*'];
        const nonMinusOperators = ['*', '/', '+', '(', ')'];

        let i = 0;
        while (i < this.expression.length) {
            if (this.expression[i] === '-' && (this.expression[i + 1] === '(' || (i !== 0 && !arithmeticMinusPredecessors.includes(this.expression[i - 1])))) {
                tokens.push(this.expression[i]);
                i++;
            } else if (nonMinusOperators.includes(this.expression[i])) {
                tokens.push(this.expression[i]);
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

                tokens.push(num);
                i = j;
            }
        }

        return tokens;
    }

    removeSpaces() {
        this.expression = this.expression.split('').filter(el => el !== ' ').join('');
    }

}

module.exports = Calculator



