var calc = new Calc();
let handle = document.querySelector(".calc-input-buttons");

handle.addEventListener("click", (event) =>  {
    calc.onButtonClick(event, calc)
});