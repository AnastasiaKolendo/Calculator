
const Calculator = require('./calculator.js');

process.argv.slice(2).forEach(val => {
    
    const calculator = new Calculator(val);
    try {
        const value = calculator.evaluateExpression();
        console.log('Answer: ' + value);
    } catch (error) {
        console.log(error.message)
    }
});
