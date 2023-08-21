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
    let a = Number(n1);
    let b = Number(n2);
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
    // a new number entry wil replace result of calculation
    // as if things being reset. 
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
    let result = 0;
    result = operate(n1,n2,op);
    displayValue = limitDecimalPoint(result,5);
    currentDisplay.textContent = displayValue;
}

/* Takes any number, and limit and returns string */
function limitDecimalPoint(num, limit){
    const dec = num.toString().split('.')[1];
    return (!isNaN(dec) && dec.length > limit) ? num.toFixed(limit) : num.toString();
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

/** Remove displayValue last char*/
function backspace(){
    let currentDisplayValue = currentDisplay.textContent;
    currentDisplayValue = (currentDisplayValue.length > 1) ? currentDisplayValue.slice(0, -1) : 0;
    currentDisplay.textContent = currentDisplayValue;
    n1 = currentDisplayValue;
}

//listen to button click
btns.forEach(btn => btn.addEventListener('click', 
    function(e) {
        let classList = e.target.classList;
        if (classList.contains('input')) displayCurrentNum(e);
        else if (classList.contains('opInput')) operateNum(e);
        else if (classList.contains('enterBtn')) enter();
        else if (classList.contains('clear')) clear();
        else if (classList.contains('backspace')) backspace();
    })
);

