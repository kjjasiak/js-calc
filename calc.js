function Calc(calcSelector) {
    this.memory = 0;
    this.calcSelector = calcSelector;
    this.window = document.querySelector(calcSelector + " .calc-input-window input");
    this.windowOperand = document.querySelector(calcSelector + " .calc-input-window .window-operand");
    this.windowOperator = document.querySelector(calcSelector + " .calc-input-window .window-operator");
    this.buttons = document.querySelector(calcSelector + " .calc-input-buttons");
    this.operators = /[-|+|x|/]+/g;
    this.numbers = /[0-9|,]+/g;
    this.actions = /[C|=]+/g;
    this.operand = null;
    this.operator = null;
    this.isCleared = true;
};

// arithmetic functions

 Calc.prototype.sum = function(a, b) {
     return a + b;
 }
 
 Calc.prototype.substract = function(a, b) {
     return a - b;
 }
 
 Calc.prototype.multiply = function(a, b) {
     return a * b;
 }
 
 Calc.prototype.divide = function(a, b) {
     return (b > 0) ? a / b : alert("Nie mozna dzielic przez zero!");
 }

 Calc.prototype.eval = function() {
    let a = parseFloat(this.operand),
        b = parseFloat(this.convertSep(this.window.value)),
        result = 0;

    console.log("operand 1: " + a);
    console.log("operand 2: " + b);

    switch(this.operator) {
        case "+":
            result = this.sum(a, b);
            break;
        case "-":
            result = this.substract(a, b);
            break;
        case "x":
            result = this.multiply(a, b);
            break;
        case "/":
            result = this.divide(a, b);
            break;
    }
    
    this.resetOps();

    if (result) {
        this.setWindow(this.convertSep(result));
    }
    else {
        this.clear();
        this.resetOps();
    }

    this.isCleared = true;
 }

// other common calculator actions

Calc.prototype.clear = function() {
    this.window.value = 0;
    this.resetOps();
    this.isCleared = true;
}

// helper functions

Calc.prototype.setWindow = function(val) {
    this.window.value = val;
}

Calc.prototype.convertSep = function(val) {
    val = val.toString();

    return (val.indexOf(",") < 0) ? val.replace('.', ',') : val.replace(',', '.');
}

Calc.prototype.separator = function() {
    if (this.window.value.indexOf(",") < 0)
        this.window.value += ",";
}

Calc.prototype.getSepPosition = function() {
    return (this.window.value.indexOf(",") > 0) ? this.window.value.length - this.window.value.indexOf(",") : -1;
}

// memory management

Calc.prototype.saveOperand = function(val) {
    this.operand = val;
    this.windowOperand.innerHTML = this.convertSep(val);
}

Calc.prototype.saveOperator = function(val, text) {
    this.operator = val;
    this.windowOperator.innerHTML = text;
}

Calc.prototype.resetOperand = function() {
    this.operand = null;
    this.windowOperand.innerHTML = "";
}

Calc.prototype.resetOperator = function() {
    this.operator = null;
    this.windowOperator.innerHTML = "";
}

Calc.prototype.resetOps = function() {
    this.resetOperand();
    this.resetOperator();
}

Calc.prototype.showMemState= function() {
    console.log("operand: " + this.operand);
    console.log("operator: " + this.operator);
}

// click events

Calc.prototype.onOperatorClick = function(val, target) {
    if (this.operand !== null)
        return;

    this.saveOperand(this.convertSep(this.window.value));
    this.setWindow(0);
    this.saveOperator(target.value, val);
    this.isCleared = true;
}

Calc.prototype.onActionClick = function(val, target) {
    let fnToRun = target.name;
    this[fnToRun]();
}

Calc.prototype.onNumberClick = function(target) {
    console.log(target.innerText);
   
    if (this.isCleared)
        this.setWindow("");
    
    this.setWindow(`${this.window.value}${target.innerText}`);
    this.isCleared = false;
}

Calc.prototype.onButtonClick = function(event) {
    let { target } = event;
    let btnText = target.innerHTML;

    if (target.className.indexOf("btn") < 0)
        return;
    
    if (target.value.match(this.operators))
        this.onOperatorClick(btnText, target);
    else if (btnText.match(this.actions)) 
        this.onActionClick(btnText, target);
    else if (btnText.match(this.numbers))
        this.onNumberClick(target);
}

Calc.prototype.onKeyPress = function(event) {
    let keyCode = event.which;

    if (keyCode >= 48 && keyCode <= 57)
        this.onNumberClick({ innerText: keyCode - 48 });        

    if (keyCode == 46)
        this.clear();
}