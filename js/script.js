// Globala variabler

const wordList = [
  "Lemonad",
  "Thaiboxning",
  "Barcelona",
  "Spanska",
  "Fullstack",
];

let selectedWord = []; // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan

let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl; // DOM-nod: Ger meddelande när spelet är över

// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector("#startGameBtn");
startGameBtnEl.addEventListener("click", startGame);

let letterButtonEls; // Array av DOM-noder: Knapparna för bokstäverna
const letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
  generateRandomWord();
  createLetterBoxes();
}

// Funktion som slumpar fram ett ord
function generateRandomWord() {
  selectedWord =
    wordList[Math.floor(Math.random() * wordList.length)].split("");
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function createLetterBoxes() {
  for (i = 0; i < selectedWord.length; i++) {
    const li = document.createElement("LI");
    const input = document.createElement("INPUT");

    li.appendChild(input);
    document.getElementById("myUl").appendChild(li);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
