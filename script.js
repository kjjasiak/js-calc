let calcWindow = document.querySelector(".calc-input-window input");
let calcButtons = document.querySelector(".calc-input-buttons");

let calc = new Calc();

function isCleared() {
    return (calcWindow.value == 0);
}

function clear() {
    console.log("clear()");
    calcWindow.value = 0;
}

function separator() {
    if (calcWindow.value.indexOf(",") >= 0)
        return;
    else
        calcWindow.value += ",";
}

function getSepPosition() {
    return (calcWindow.value.indexOf(",") > 0) ? calcWindow.value.length - calcWindow.value.indexOf(",") : -1;
}


calcButtons.addEventListener("click", (event) => {
    let { target } = event;
    console.log(target)

    if (target.className.indexOf("btn") < 0)
        return;

    if (isCleared())
        calcWindow.value = "";
    
    if (target.className.indexOf("btn-special") >= 0) {
        let fnToRun = target.name;
        window[fnToRun]();
    }
    else {
        console.log(getSepPosition());
        calcWindow.value = `${calcWindow.value}${target.innerText}`;
    }
});