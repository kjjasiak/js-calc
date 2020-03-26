function Calc() {
    this.memory = 0; 
    this.window = document.querySelector(".calc-input-window input");
    this.windowOperator = document.querySelector(".calc-input-window .window-operator");
    this.buttons = document.querySelector(".calc-input-buttons");
    this.operators = /[-|+|x|/]+/g;
    this.numbers = /[0-9|,]+/g;
    this.actions = /[C|=]+/g;
    this.operand = null;
    this.operator = null;
};
 
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

 Calc.prototype.isCleared = function() {
    return (this.window.value == 0);
}

Calc.prototype.clear = function() {
    this.window.value = 0;
    this.resetOperand();
    this.resetOperator();
}

Calc.prototype.setWindow = function(val) {
    this.window.value = val;
}

Calc.prototype.saveOperand = function(val) {
    this.operand = val;
}

Calc.prototype.saveOperator = function(val) {
    this.operator = val;
    this.windowOperator.innerHTML = val;
}

Calc.prototype.resetOperand = function() {
    this.operand = null;
}

Calc.prototype.resetOperator = function() {
    this.operator = null;
    this.windowOperator.innerHTML = "";
}

Calc.prototype.eval = function() {
    let a = parseFloat(this.convertSep(this.operand)),
        b = parseFloat(this.convertSep(this.window.value)),
        result = 0;

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
    
    this.resetOperand();
    this.resetOperator();

    if (result)
        this.setWindow(result);
    else {
        this.clear();
        this.resetOperand();
        this.resetOperator();
    }
}

Calc.prototype.convertSep = function(val) {
    return val.replace(',', '.');
}

Calc.prototype.separator = function() {
    if (this.window.value.indexOf(",") < 0)
        this.window.value += ",";
}

Calc.prototype.getSepPosition = function() {
    return (this.window.value.indexOf(",") > 0) ? this.window.value.length - this.window.value.indexOf(",") : -1;
}

Calc.prototype.onButtonClick = function(event) {
    let { target } = event;
    let btnText = target.innerHTML;

    if (target.className.indexOf("btn") < 0)
        return;
    
    if (btnText.match(this.operators)) {
        if (this.operand === null) {
            this.saveOperand(this.window.value);
            this.clear();
            this.saveOperator(btnText);
        }
    }
    else if (btnText.match(this.actions)) {
        console.log(target.name);
        let fnToRun = target.name;
        this[fnToRun]();
    }
    else if (btnText.match(this.numbers)) {
        if (this.isCleared())
            this.setWindow("");

        this.setWindow(`${this.window.value}${target.innerText}`);
    }
}