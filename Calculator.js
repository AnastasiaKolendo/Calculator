class Calculator {
    constructor(expression) {
        this.expression = expression;
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
                    if (operations.length === 0) throw new Error('Invalid Input');

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
        if (operator === '-') return operand2 - operand1;
        if (operator === '+') return operand1 + operand2;
        if (operator === '*') return operand1 * operand2;
        else return operand2 / operand1;
    }


    parseExpression() {
        const array = [];
        this.removeSpaces();
        let expression = this.expression;
        let i = 0;

        while (i < expression.length) {

            if (expression[i] === '-' && i !== 0 && expression[i - 1] !== '+' && expression[i - 1] !== '-' && expression[i - 1] !== '(' && expression[i - 1] !== '/' && expression[i - 1] !== '*') {
                    array.push(expression[i]);
                    i++;
            } else if (expression[i] === '*' || expression[i] === '/' || expression[i] === '+' || expression[i] === '(' || expression[i] === ')') {
                array.push(expression[i]);
                i++;
            } else {

                let j = i;

                if(expression[j] === '-'){
                    j = i + 1
                }

                while(expression[j] === '.' || !isNaN(expression[j])){
                    j++;
                }

                const numString = expression.slice(i, j);
                
                const num = Number.parseFloat(numString);

                if(isNaN(num)){
                    
                    throw new Error('Invalid number at ' + expression.slice(i));
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


