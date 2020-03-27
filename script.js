var calc = new Calc(".calc-main");
let handle = document.querySelector(".calc-input-buttons");

handle.addEventListener("click", (event) =>  {
    calc.onButtonClick(event, calc)
});

document.addEventListener("keydown", function(event) {
    calc.onKeyPress(event)
});