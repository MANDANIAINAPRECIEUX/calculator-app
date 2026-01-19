const display = document.querySelector(".display");
const controlButtons = document.querySelector(".controls").children;

const allSymbols = ["+", "-", "X", "÷", "%", "C", "=", "⌫"];

let firstValue = "";
let secondValue = "";
let symbol = "";
let result = "";
let equalsClicked = false;

// 🔢 CALCUL
const calculate = () => {
  const a = parseFloat(firstValue);
  const b = parseFloat(secondValue);

  if (symbol === "+") result = a + b;
  if (symbol === "-") result = a - b;
  if (symbol === "X") result = a * b;
  if (symbol === "÷") {
    if (b === 0) {
      display.innerText = "Error";
      firstValue = "";
      secondValue = "";
      symbol = "";
      return;
    }
    result = a / b;
  }
  if (symbol === "%") result = a % b;

  display.innerText = result;
  firstValue = result.toString();
  secondValue = "";
};

// 🖱️ GESTION DES BOUTONS
for (let button of controlButtons) {
  button.addEventListener("click", () => {
    const btnValue = button.innerText;
    const isSymbol = allSymbols.includes(btnValue);

    // ⌫ BACKSPACE
    if (btnValue === "⌫") {
      equalsClicked = false;

      if (secondValue !== "") {
        secondValue = secondValue.slice(0, -1);
      } else if (symbol !== "") {
        symbol = "";
      } else {
        firstValue = firstValue.slice(0, -1);
      }

      display.innerText = display.innerText.slice(0, -1);
      return;
    }

    // 🧹 CLEAR
    if (btnValue === "C") {
      firstValue = "";
      secondValue = "";
      symbol = "";
      equalsClicked = false;
      display.innerText = "";
      return;
    }

    // 🔁 CHIFFRE APRÈS "=" → REMPLACER
    if (equalsClicked && !isSymbol) {
      firstValue = btnValue;
      secondValue = "";
      symbol = "";
      equalsClicked = false;
      display.innerText = btnValue;
      return;
    }

    // =
    if (btnValue === "=") {
      if (secondValue === "") return;
      calculate();
      equalsClicked = true;
      return;
    }

    // 🔄 REMPLACER LE SYMBOLE
    if (
      isSymbol &&
      symbol !== "" &&
      secondValue === "" &&
      display.innerText.slice(-1) === symbol
    ) {
      symbol = btnValue;
      display.innerText =
        display.innerText.slice(0, -1) + btnValue;
      return;
    }

    // ➕ SYMBOL
    if (firstValue !== "" && isSymbol) {
      if (secondValue !== "") calculate();
      symbol = btnValue;
      equalsClicked = false;
    }
    // 🔢 FIRST VALUE
    else if (symbol === "") {
      firstValue += btnValue;
    }
    // 🔢 SECOND VALUE
    else {
      secondValue += btnValue;
    }

    display.innerText += btnValue;
  });
}
