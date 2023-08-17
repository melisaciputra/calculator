let n1 = 0; //first number
let n2 = 0; //second number
let operator = ""; // operator 

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
function operate(a,b,op){
    switch (op) {
        case "add":
            return add(a,b);
        case "substract":
            return substract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);    
        default:
          return undefined;
      }
}