export default class Stack {

    // Array is used to implement stack 
    constructor(formula, valx, valy, valz, valt) {
        this.items = [];
        this.postfix = [];
        this.formula = formula;
        this.valx = valx
        this.valy = valy
        this.valz = valz
        this.valt = valt
        this.vars = ["x", "y", "z", "t"]
        this.ops = ["+", "-", "*", "/"]
        this.allValidSym = [...this.vars, ...this.ops]
    }

    validator() {
        const splFormula = this.formula.split("").map(x => x.toLowerCase());
        let isUsed = [0, 0, 0, 0]
        if (this.valx == "" || this.valy == "" || this.valz == "" || this.valt == "" || isNaN(this.valx) || isNaN(this.valy) || isNaN(this.valz) || isNaN(this.valt)) {
            return 4; //Can't blank and must be numeric
        }
        for (let i = 0; i < splFormula.length; i++) {
            if (!(this.allValidSym.includes(splFormula[i]))) {
                return 1; //Invalid operator
            }
            if ((i % 2 == 0 && !this.vars.includes(splFormula[i])) || (i % 2 == 1 && !this.ops.includes(splFormula[i]))) {
                return 2; //You should use one and only one operation beetween each value
            }
            if (i % 2 == 0) {
                isUsed[this.vars.indexOf(splFormula[i])] = 1;
            }

        }
        if (isUsed.includes(0)) {
            return 3; //You should use every variable in formula.
        }

        return 0;

    }

    infToPost() {
        const splFormula = this.formula.split("").map(x => x.toLowerCase());
        for (let elm in splFormula) {
            if (splFormula[elm] == "x") {
                this.postfix.push(parseFloat(this.valx))
            }
            else if (splFormula[elm] == "y") {
                this.postfix.push(parseFloat(this.valy))
            }
            else if (splFormula[elm] == "z") {
                this.postfix.push(parseFloat(this.valz))
            }
            else if (splFormula[elm] == "t") {
                this.postfix.push(parseFloat(this.valt))
            }
            else if (splFormula[elm] == "+" || splFormula[elm] == "-") {
                if (this.isEmpty()) {
                    this.push(splFormula[elm]);
                }
                else {
                    while (!this.isEmpty()) {
                        this.postfix.push(this.pop());
                    }
                    this.push(splFormula[elm]);
                }
            }
            else if (splFormula[elm] == "*" || splFormula[elm] == "/") {
                if (this.isEmpty() || this.peek() == "-" || this.peek() == "+") {
                    this.push(splFormula[elm]);
                }
                else {
                    while (!this.isEmpty() && (this.peek() == "*" || this.peek() == "/")) {
                        this.postfix.push(this.pop());

                    }
                    this.push(splFormula[elm]);
                }
            }
        }
        while (!this.isEmpty()) {
            this.postfix.push(this.pop());
        }

    }

    calculate() {
        this.infToPost();
        for (let elm in this.postfix) {

            if (!isNaN(this.postfix[elm])) {
                this.push(this.postfix[elm]);
            }
            else {
                let valRight = this.pop();
                let valLeft = this.pop();

                if (this.postfix[elm] == "+") {
                    this.push((valLeft + valRight));
                    this.peek();
                }
                else if (this.postfix[elm] == "-") {
                    this.push((valLeft - valRight));
                }
                else if (this.postfix[elm] == "*") {
                    this.push((valLeft * valRight));
                }
                else if (this.postfix[elm] == "/") {
                    this.push((valLeft / valRight));
                }
            }
        }

        return this.pop();
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length == 0)
            return "Stack is EMPTY!";
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        // return true if stack is empty 
        return this.items.length == 0;
    }


}

