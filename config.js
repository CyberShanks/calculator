mathString = "";
//node which has all operations selected
let operations = document.querySelectorAll(".opr");
//node which has screen selected
let display = document.querySelector("#screen");

let buttons = document.querySelectorAll("button");
buttons.forEach(button => {
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
            if (button.id == "eql") evaluate();
            //disable operators
            operations.forEach(operate => operate.disabled = true)
            mathString = mathString + button.id;
        }
        //display string on screen
        display.textContent = mathString;
    })
});

function evaluate() {
    //evaluates the string of calculation
}