mathString = "";
//node which has all operations selected
let operations = document.querySelectorAll(".opr");
//node which has screen selected
let display = document.querySelector("#calculation-string");
//node which has answer selected
let answer = document.querySelector("#answer");

let buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    // !!!!!it doesnt make sense to code a generic event listener function, much better to code one for each pad -> numberpad, operations and equals.
    button.addEventListener('click', () => {
        //register the button click, identify which type of button it is
        if (button.className == "num") {
            operations.forEach(operate => operate.disabled = false)
            mathString = mathString + button.id;
        }
        else if (button.className == "spc") {
            if (button.id == "clc") {
                mathString = "";
                operations.forEach(operate => operate.disabled = false);
            }
            else if (button.id == "del") {
                mathString = mathString.slice(0, mathString.length - 1)
                //detect the most recent character in the string remaining to determine if enable operations
                lastChar = mathString.slice(-1);
                console.log(lastChar);
                if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/") {
                    //disable the operations
                    operations.forEach(operate => operate.disabled = true)
                }
                else
                    operations.forEach(operate => operate.disabled = false);
            }
        }
        else {
            if (button.id == "=") {
                // while (RemainingOperators) 
                mathString = mathString + button.id;
                Evaluate();
            }
            //disable operators
            operations.forEach(operate => operate.disabled = true)
            mathString = mathString + button.id;
        }
        //display string on screen
        display.textContent = mathString;
    })
});

function Evaluate() {
    //evaluates the mathString
    //55-6*2/6+13=
    //55+6=
    var operator = 0;
    console.log(mathString);
    for (let index = 0; index < mathString.length; index++) {
        if (mathString[index] == "+" || mathString[index] == "-" || mathString[index] == "*" || mathString[index] == "/") {
            var num1 = Number(mathString.slice(0, index));
            console.log("number1 = " + num1);
            console.log("index = " + index);
            if (mathString[index] == "+") operator = 1;
            if (mathString[index] == "-") operator = 2;
            if (mathString[index] == "*") operator = 3;
            if (mathString[index] == "/") operator = 4;
            console.log(operator);
            //problem occurs after this point. no immediate solution !?
            for (let index2 = index+1; index2 < mathString.length; index2++) {
                console.log("index rn -> " + index2);
                if (mathString[index2] == "+" || mathString[index2] == "-" || mathString[index2] == "*" || mathString[index2] == "/") {
                    var num2 = Number(mathString.slice(index + 1, index2));
                    console.log(num2);
                    mathString = Operate(num1, num2, operator) + mathString.slice(index2, mathString.length);
                    return;
                }
                else if (mathString[index] == "=") {
                    answer.textContent = mathString.slice(0,mathString-1);
                }
            }
        }
    }
    //if string still contains operators, run the evaluate function again ---> done by operate function
}

function Operate(number1, number2, operator){
    if (operator == 1) return number1 + number2;
    if (operator == 2) return number1 - number2;
    if (operator == 3) return number1 * number2;
    if (operator == 4) {
        try {
            number1 / number2;
            if (!number2)
            throw new Error("Invalid Division");
        }

        catch(e) {
            answer.textContent = "Error";
        }

    }
}

function RemainingOperators (){
    for (let index = 0; index < mathString.length; index++) {
        if (mathString[index] == "+" || mathString[index] == "-" || mathString[index] == "*" || mathString[index] == "/" || mathString[index] == "=")
            return true;
        else return false;
}
}
