const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your expression, please: ", function (input) {
    const calculator = new Calculator(input);

    try {
        const value = calculator.evaluateExpression();
        console.log('Answer: ' + value);
    } catch (error) {
        console.log(error.message)
    }
    
    rl.close()
});