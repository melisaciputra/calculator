const btns = document.querySelectorAll('button');
const currentDisplay = document.querySelector('#display');
const currentOp = document.querySelector('#currentOp');
let n1 = ""; //first number
let n2 = ""; //second number
let op = ""; // operator
let displayValue = "";  
let displayOp = "";
let resultBeingDisplayed = false;

function add(a,b) {
    return a+b;
}
function substract (a,b){
    return a-b;
}
function multiply (a,b){
    return a*b;
}
function divide (a,b){
    return a/b;
}
function operate(n1,n2,op){
    let a = parseInt(n1);
    let b = parseInt(n2);
    switch (op) {
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "×":
            return multiply(a,b);
        case "÷":
            if (b === 0) {
                alert("Why are you dividing by zero? Here is 0 for you.");
                return 0;}
            else return divide(a,b);    
        default:
          return undefined;
      }
}

// function for input number(s)
function displayCurrentNum(e){
    //if result being displayed after enter, a jjjjjju.,new number entry wil simply replace it
    // as if things has been reset
    if (resultBeingDisplayed) {
        n1 = "";
        displayValue = e.target.value;
    }
    else displayValue += e.target.value;
    currentDisplay.textContent = displayValue;
    resultBeingDisplayed = false;
}

// actual calculation used by operator and equal buttons
function calculate(){
    n2 = displayValue;
    displayValue = operate(n1,n2,op).toString();
    currentDisplay.textContent = displayValue;
}

function resetAfterCalc(){
    n1 = displayValue;
    n2 = "";
    op = "";
    displayValue = "";
}

function clear(){
    n1 = "";
    n2 = "";
    op = "";
    displayValue = "";
    displayOp = "";
    currentOp.textContent = displayOp;
    currentDisplay.textContent = "0";
}

// for button 
function operateNum(e){
    if (n1.length === 0) {
        op = e.target.value;
        //startup or after clear
        if (displayValue.length === 0){
            displayValue = 0;
        }
        n1 = displayValue;
        displayOp = `${n1} ${op}`;
        displayValue = "";
    }  
    else {
        // if here to prevent user punching op button continuously
        if (displayValue.length !== 0){
            calculate();
            resetAfterCalc();
        } 
        op = e.target.value;
        displayOp = `${n1} ${op} ${n2}`;
    }
    currentOp.textContent = displayOp;
    resultBeingDisplayed = false;
}

// for the equal button
function enter(){
    if (n1.length !== 0 && op.length !== 0){
        calculate();
        displayOp = `${n1} ${op} ${n2} =`;
        currentOp.textContent = displayOp;
        resetAfterCalc();
        resultBeingDisplayed = true;
    }
}

//listen to button click
btns.forEach(btn => btn.addEventListener('click', 
    function(e) {
        let classList = e.target.classList;
        if (classList.contains('input')) displayCurrentNum(e);
        else if (classList.contains('opInput')) operateNum(e);
        else if (classList.contains('enterBtn')) enter();
        else if (classList.contains('clear')) clear();
    })
);

