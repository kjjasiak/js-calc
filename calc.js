class Calc {

    constructor(calcSelector, handleSelector) {

        this.selectors = {
            calcSelector: calcSelector,
            window: document.querySelector(calcSelector + " .calc-input-window input"),
            windowOperand: document.querySelector(calcSelector + " .calc-input-window .window-operand"),
            windowOperator: document.querySelector(calcSelector + " .calc-input-window .window-operator"),
            buttons: document.querySelector(calcSelector + " .calc-input-buttons")
        }

        this.state = {
            memory: 0,
            operand: null,
            operator: null,
            isCleared: true
        }

        this.mappings = {
            operators: /[-|+|x|/]+/g,
            numbers: /[0-9|,]+/g,
            actions: /[C|=]+/g,
            operatorKeys: {
                187: "+",
                189: "-",
                56: "*",
                191: "/"
            },
            actionKeys: {
                46: "clear",
                13: "equal",
                187: "equal"
            },
            tmpOps: {
                "+": "+",
                "-": "-",
                "*": "×",
                "/": "÷"
            }
        }
        
        this.setIDs();
        this.attachEventHandlers(handleSelector);
    }

    // arithmetic functions
    
    sum(a, b) {
        return a + b;
    }

    substract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return (b > 0) ? a / b : alert("Nie mozna dzielic przez zero!");
    }

    getResult(a, b) {
        let expressions = {
            "+": (a, b) => {
                return this.sum(a, b);
            },
            "-": (a, b) => {
                return this.substract(a, b);
            },
            "*": (a, b) => {
                return this.multiply(a, b);
            },
            "/": (a, b) => {
                return this.divide(a, b);
            }
        }

        if (this.state.operator == null)
            return;

        return expressions[this.state.operator](a, b);
    }

    equal() {
        // if (this.state.operand == null || this.state.operator == null)
        //     return;

        let a = parseFloat(this.state.operand),
            b = parseFloat(this.convertSep(this.selectors.window.value)),
            result = 0;
    
        // console.log("operand 1: " + a);
        // console.log("operand 2: " + b);
    
        result = this.getResult(a, b);
        
        this.resetOps();
    
        if (result) {
            this.setWindow(this.convertSep(result));
        }
        else {
            this.clear();
            this.resetOps();
        }
    
        this.state.isCleared = true;
     }

     // other common calculator actions

    clear() {
        this.selectors.window.value = 0;
        this.resetOps();
        this.state.isCleared = true;
    }

    // helper functions

    setIDs(val) {
        let numberKeys = document.querySelectorAll(".btn-number");
        // console.log(numberKeys);

        for (let key of numberKeys) {
            key.id = "number-" + key.textContent;
        }
    }

    setWindow(val) {
        this.selectors.window.value = val;
    }

    convertSep(val) {
        val = val.toString();
    
        return (val.indexOf(",") < 0) ? val.replace('.', ',') : val.replace(',', '.');
    }

    separator() {
        if (this.selectors.window.value.indexOf(",") < 0)
            this.selectors.window.value += ",";
    }

    getSepPosition() {
        return (this.selectors.window.value.indexOf(",") > 0) ? this.selectors.window.value.length - this.selectors.window.value.indexOf(",") : -1;
    }

    // memory management

    saveOperand(val) {
        this.state.operand = val;
        this.selectors.windowOperand.innerHTML = this.convertSep(val);
    }

    saveOperator(val, text) {
        this.state.operator = val;
        this.selectors.windowOperator.innerHTML = text;
    }

    resetOperand() {
        this.state.operand = null;
        this.selectors.windowOperand.innerHTML = "";
    }

    resetOperator() {
        this.state.operator = null;
        this.selectors.windowOperator.innerHTML = "";
    }

    resetOps() {
        this.resetOperand();
        this.resetOperator();
    }

    showMemState() {
        console.log("operand: " + this.state.operand);
        console.log("operator: " + this.state.operator);
    }

    // event handlers

    attachEventHandlers(handleSelector) {
        let handle = document.querySelector(handleSelector);

        handle.addEventListener("click", (event) =>  {
            this.onButtonClick(event, this);
        });
        
        document.addEventListener("keydown", (event) => {
            this.onKeyPress(event);
        });
    }
    
    // click events

    onOperatorClick(val, target) {
        if (this.state.operand !== null)
            return;

        this.saveOperand(this.convertSep(this.selectors.window.value));
        this.setWindow(0);
        this.saveOperator(target.value, val);
        this.state.isCleared = true;
    }

    onActionClick(target) {
        this[target.id]();
    }

    onNumberClick(target) {
        if (this.state.isCleared)
            this.setWindow("");
        
        this.setWindow(`${this.selectors.window.value}${target.innerText}`);
        this.state.isCleared = false;
    }

    onButtonClick(event) {
        let { target } = event;
        let btnText = target.innerHTML;
    
        if (target.className.indexOf("btn") < 0)
            return;
            
        if (this.mappings.tmpOps.hasOwnProperty(target.value))
            this.onOperatorClick(btnText, target);
        else if (btnText.match(this.mappings.actions)) 
            this.onActionClick(target);
        else if (btnText.match(this.mappings.numbers))
            this.onNumberClick(target);
    }

    onKeyPress(event) {   
        let keyCode = event.which;
    
        if (event.shiftKey) {
            if (keyCode == 56 || keyCode == 187) {
                let keyBtn = document.querySelector('[value="' + event.key + '"]');
    
                this.onOperatorClick(this.mappings.tmpOps[this.mappings.operatorKeys[keyCode]], { value: this.mappings.operatorKeys[keyCode] });
                keyBtn.classList.add("focus");
                setTimeout(function(){ keyBtn.classList.remove("focus"); }, 300);
                return;
            }
        }
    
        if (keyCode >= 48 && keyCode <= 57) {
            let keyBtn = document.getElementById("number-" + event.key);
    
            this.onNumberClick({ innerText: keyCode - 48 });
            keyBtn.classList.add("focus");
            setTimeout(function(){ keyBtn.classList.remove("focus"); }, 300);
            return;
        }
    
        if (keyCode == 188) {
            this.onNumberClick({ innerText: "," });
            return;
        }
    
        if (this.mappings.actionKeys.hasOwnProperty(keyCode)) {
            this.onActionClick({ id: this.mappings.actionKeys[keyCode] });

            if (keyCode == 13) {
                event.preventDefault();
            }

            return;
        } 
    
        if (this.mappings.operatorKeys.hasOwnProperty(keyCode)) {
            this.onOperatorClick(this.mappings.tmpOps[this.mappings.operatorKeys[keyCode]], { value: this.mappings.operatorKeys[keyCode] });
            return;
        }
    }
};