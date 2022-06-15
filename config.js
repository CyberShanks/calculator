mathString = "";

//node which has questionString selected
let qString = document.querySelector("#calculation-string");
//node which has answer selected
let answer = document.querySelector("#answer");

//operationpad event handler
let operations = document.querySelectorAll(".opr");
operations.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operator.id != "eql") {  //handled seperately, grouped up with operators to disable all with ease
            mathString = mathString + operator.id;
            //disable all operations
            operations.forEach(operate => operate.disabled = true)
            qString.textContent = mathString;
        }
    })
})

//numberpad event handler
let numbers = document.querySelectorAll(".num");
numbers.forEach(number => {
    number.addEventListener('click', () => {
        //enable all operations
        operations.forEach(operate => operate.disabled = false)
        mathString = mathString + number.id;
        qString.textContent = mathString;
    })
})

//specialkeys event handler
let delButton = document.querySelector("#del");
delButton.addEventListener('click', () => {
    mathString = mathString.slice(0, mathString.length - 1)
    //detect the most recent character in the string remaining to determine if enable operations
    lastChar = mathString.slice(-1);
    console.log(lastChar);
    numbers.forEach(number => number.disabled = false);
    if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
        //disable the operations
        operations.forEach(operate => operate.disabled = true)
    }
    else
        operations.forEach(operate => operate.disabled = false);
    qString.textContent = mathString;
})

let clearButton = document.querySelector("#clr");
clearButton.addEventListener('click', () => {
    mathString = "";
    operations.forEach(operate => operate.disabled = false);
    qString.textContent = mathString;
    answer.textContent = "";
    numbers.forEach(number => number.disabled = false);
})

// equals button handler
let equalButton = document.querySelector("#eql");
equalButton.addEventListener('click', () => {
    mathString = mathString + "=";
    qString.textContent = mathString;
    Evaluate(mathString);
    numbers.forEach(number => number.disabled = true);
    operations.forEach(operate => operate.disabled = true);
});

function Evaluate(calculation) {
    //evaluates the mathString
    //55-6*2/6+13=
    //55+6=
    var operator = 0;
    console.log(calculation);
    for (let index = 0; index < calculation.length; index++) {
        if (OperatorFind(calculation[index])) {
            var num1 = Number(calculation.slice(0, index));
            console.log("number1 = " + num1);
            console.log("index = " + index);
            operator = OperatorFind(calculation[index]);
            if (operator == 5){
                //if operator is =
                answer.textContent = calculation.slice(0, calculation.length - 1);
                return;
            }
            console.log(operator + " is the operator from 1st loop");
            //problem occurs after this point. no immediate solution !?
            for (let index2 = index + 1; index2 < calculation.length; index2++) {
                console.log("index rn -> " + index2);
                if (OperatorFind(calculation[index2])) {
                    var num2 = Number(calculation.slice(index+1, index2));
                    console.log(num2);
                    calculation = Operate(num1, num2, operator) + calculation.slice(index2, calculation.length);
                    Evaluate(calculation);
                    return;
                }
            }
        }
    }
    //if string still contains operators, run the evaluate function again ---> done by operate function
}

function OperatorFind(operator){
    if (operator == "+") return 1;
    else if (operator == "-") return 2;
    else if (operator == "*") return 3;
    else if (operator == "/") return 4;
    else if (operator == "=") return 5;
    else return 0;
}

function Operate(number1, number2, operator) {
    if (operator == 1) return number1 + number2;
    if (operator == 2) return number1 - number2;
    if (operator == 3) return number1 * number2; //division does not work
    if (operator == 4) {
        if (number2) return (number1/number2).toFixed(3);
        answer.textContent = "ERROR";
        numbers.forEach(number => number.disabled = true);
    }
    if (operator == 5) return true
}