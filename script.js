const clear = document.getElementById('clear');
const del = document.getElementById('del');
const dot = document.getElementById('dot');
const result = document.getElementById('result');
const input = document.getElementById('input');
const active = document.getElementById('active')

let lastNumber = "";
let expression = "";
let isResult = false;



const numberButtons = Array.from(document.querySelectorAll("table button"))
    .filter(button => /^\d$/.test(button.id));

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        if(isResult){
            expression = "";
            lastNumber = "";
            isResult = false;
        }
        lastNumber += button.textContent;
        updateDisplay();
    });
});

clear.addEventListener('click', function(){
    expression = "";
    lastNumber = "";
    isResult = false;
    updateDisplay();
})

del.addEventListener('click', function(){
    lastNumber = lastNumber.slice(0, -1);
    updateDisplay();
})

dot.addEventListener("click", () => {
    if(isResult){
        expression = "";
        lastNumber = "";
        isResult = false;
    }
    if (!lastNumber.includes('.')) {
        lastNumber += '.';
        updateDisplay();
    }
});

const operatorButtons = Array.from(document.querySelectorAll("button"))
    .filter(button => ["div", "mult", "diff", "plus"].includes(button.id));

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(isResult){
            isResult = false;
        }
        expression += lastNumber + " " + button.textContent + " ";
        lastNumber = "";
        updateDisplay();
    });
});

function updateDisplay() {
    input.innerHTML = `<span class="inactive">${expression}</span><span id="active">${lastNumber}</span>`;
}

result.addEventListener('click', function(){
    try {
        const fullExpression = expression + lastNumber;
        
        const result = eval(fullExpression.replace(/÷/g, '/').replace(/×/g, '*'));
        
        expression = "";
        lastNumber = result.toString();
        isResult = true;

        updateDisplay();
    } catch (error) {
        alert("Ошибка в выражении");
        expression = "";
        lastNumber = "";
        updateDisplay();
    }
})