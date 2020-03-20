function Calc() {
    this.memory = 0; 
    this.window = document.querySelector(".calc-input-window input");
    this.buttons = document.querySelector(".calc-input-buttons");
    
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

 Calc.prototype.eval = function() {
    let operands = this.getOperands();
    let operators = this.window.value.match(/[+]+/g);

    for (let i = 0; i < operands.length; i++)
        operands[i] = operands[i].replace(',', '.');

    if (operands == 0 || operators == null)
        return;

    let result = parseFloat(operands[0]);

    for (let i = 1; i < operands.length; i++)
        result += parseFloat(operands[i]);
    
    this.window.value = result.toString().replace('.',',');
 }

 Calc.prototype.getOperands = function() {
    return this.window.value.split(/[+]+/);
 }

 Calc.prototype.isCleared = function() {
    return (this.window.value == 0);
}

Calc.prototype.clear = function() {
    console.log("clear()");
    this.window.value = 0;
}

Calc.prototype.plus = function() {
    if (this.window.value != 0)
        this.window.value += "+";
}

Calc.prototype.separator = function() {
    let operands = this.getOperands();

    if (operands[operands.length-1].indexOf(",") >= 0)
        return;
    else
        this.window.value += ",";
}

Calc.prototype.getSepPosition = function() {
    return (this.window.value.indexOf(",") > 0) ? this.window.value.length - this.window.value.indexOf(",") : -1;
}

Calc.prototype.onButtonClick = function(event) {
    let { target } = event;

    if (target.className.indexOf("btn") < 0)
        return;
    
    if (target.className.indexOf("btn-special") >= 0) {
        let fnToRun = target.name;
        this[fnToRun]();
    }
    else {
        if (this.isCleared())
            this.window.value = "";

        this.window.value = `${this.window.value}${target.innerText}`;
    }
}