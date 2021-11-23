// Globala variabler

const wordList = [
  "lemonad",
  "thaiboxning",
  "barcelona",
  "spanska",
  "fullstack",
];

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord = [];

let myUlEl = document.getElementById("myUl");

let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl; // DOM-nod: Ger meddelande när spelet är över

// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector("#startGameBtn");
startGameBtnEl.addEventListener("click", startGame);

// Array av DOM-noder: Knapparna för bokstäverna
let letterButtonEls = document.querySelector("#letterButtons");
letterButtonEls.addEventListener("click", handleButtons);

let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

let letterCorrect = [];
let letterIncorrect = [];

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
  generateRandomWord();
  createLetterBoxes();
}

// Funktion som slumpar fram ett ord
function generateRandomWord() {
  selectedWord =
    wordList[Math.floor(Math.random() * wordList.length)].split("");
  console.log(selectedWord);
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
  myUlEl.innerHTML = ""; // Här nollställer jag allt innanför ul.
  for (i = 0; i < selectedWord.length; i++) {
    const li = document.createElement("LI");
    const input = document.createElement("INPUT");

    li.appendChild(input);
    myUlEl.appendChild(li);
  }
}

// console.log(event.target.innerHTML) gör så att knappen man trycker på loggas på console.
function handleButtons(event) {
  if (selectedWord.includes(event.target.innerHTML)) {
    letterCorrect.push(event.target.innerHTML);
  } else {
    letterIncorrect.push(event.target.innerHTML);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
