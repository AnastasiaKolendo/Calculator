class Calculator{
    constructor(){
        this.value = 0;
    }

    calculateValue(str){
        const parsedArray = parseString(str);

    }

    calculate(num1, operator, num2){
        let result;
        if(operator === '-'){
            result = num1 - num2;
        } else if(operator === '+'){
            result = num1 + num2;
        } else if(operator === '*'){
            result = num1 * num2
        } else {
            result = num1 / num2;
        }
    }


    parseString(str){
        const array = [];
        s = s.replace(/\s/g, "");
        
        for(let i = 0; i < s.length; i++){
            if(s[i] === '*' || s[i] === '/' || s[i] === '+' || s[i] === '-' || s[i] === '(' || s[i] === ')'){
               array.push(s[i]); 
            } else {
                
                const num = Number.parseInt(s.slice(i));
               
                array.push(num);
                i = i + String(num).length - 1;
            }
        }
        return array;
    }

    clear(){
        this.value = 0;
    }
}



