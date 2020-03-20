let Calc = function() {
    this.memory = 0; 
 };
 
 Calc.prototype.sum = (a, b) => {
     return a + b;
 }
 
 Calc.prototype.substract = (a, b) => {
     return a - b;
 }
 
 Calc.prototype.multiply = (a, b) => {
     return a * b;
 }
 
 Calc.prototype.divide = (a, b) => {
     return (b > 0) ? a / b : alert("Nie mozna dzielic przez zero!");
 }