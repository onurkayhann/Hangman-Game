// Globala variabler

// Min array
const wordList = [
  "berlin",
  "madrid",
  "oslo",
  "prag",
  "aten",
  "london",
  "paris",
  "wien",
];

const hangmanPhotos = [];

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord = [];

let letterCorrect = [];
let letterIncorrect = [];
let checkWinner = [];

let myUlEl = document.getElementById("myUl");

let guesses = 0; // Number: håller antalet gissningar som gjorts
const amountOfGuess = 6;

// let hangmanImg = document.getElementById("hangman");
let hangmanImg = document.querySelector("#hangman");

// Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl = document.getElementById("#message"); // DOM-nod: Ger meddelande när spelet är över

// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector("#startGameBtn");
startGameBtnEl.addEventListener("click", startGame);

// Array av DOM-noder: Knapparna för bokstäverna
let letterButtonEls = document.querySelector("#letterButtons");
letterButtonEls.addEventListener("click", handleButtons);

let letterBoxEls = document.querySelector("#letterBoxes > ul"); // Array av DOM-noder: Rutorna där bokstäverna ska stå

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGame() {
  generateRandomWord();
  createLetterBoxes();
  resetGame();
}

// Funktion som slumpar fram ett ord
// toUpperCase för att konvertera till stora bokstäver
// split() bryter ner ordet till bokstäver.
function generateRandomWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)]
    .toUpperCase()
    .split("");
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram.
// Tar in rätt ord i boxarna.
function createLetterBoxes() {
  myUlEl.innerHTML = ""; // Här nollställer jag allt innanför ul.
  for (i = 0; i < selectedWord.length; i++) {
    let newLi = document.createElement("LI");
    let input = document.createElement("INPUT");
    input.type = "text";
    input.disabled = true;
    input.value = letterCorrect.includes(selectedWord[i])
      ? selectedWord[i]
      : " ";
    newLi.appendChild(input);
    letterBoxEls.appendChild(newLi);
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// 1) Den kollar om bokstaven finns med i selectedWord.
// Beroende på utfallet så hamnar bokstaven antingen i letterCorrect eller letterIncorrect.
// Kollar om spelaren har vunnit genom att köra runCheckWinner().
// Varje gång spelaren gissar fel, så aktiveras guesses++ och triggar Hangmanbilden.
function handleButtons(event) {
  if (selectedWord.includes(event.target.innerHTML)) {
    letterCorrect.push(event.target.innerHTML);
    event.target.disabled = true;
    createLetterBoxes();
    runCheckWinner();
  } else {
    letterIncorrect.push(event.target.innerHTML);
    event.target.disabled = true;
    guesses++;
    hangmanImg.src = "images/h" + guesses + ".png";

    if (guesses === amountOfGuess) {
      message.innerHTML = "HAHA!😂 You've lost!";
      startGameBtnEl.textContent = "Spela igen";
      const btn = document.querySelectorAll("#letterButtons > li > button");
      for (let i = 0; i < btn.length; i++) {
        btn[i].disabled = true;
      }
    }
  }
}

// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Kollar om spelaren har vunnit.
function runCheckWinner() {
  const correctWordElements = document.querySelectorAll("#myUl > li > input");
  checkWinner.splice(0, checkWinner.length);
  for (let i = 0; i < selectedWord.length; i++) {
    if (correctWordElements[i].value === selectedWord[i]) {
      checkWinner.push(correctWordElements[i].value);
    }
  }
  if (checkWinner.length === selectedWord.length) {
    message.innerHTML = "CONGRATULATIONS! You won! 🏆";
    startGameBtnEl.textContent = "Spela igen";

    const btn = document.querySelectorAll("#letterButtons > li > button");
    for (let i = 0; i < btn.length; i++) {
      btn[i].disabled = true;
    }
  }
}

// Startar om spelet vid vinst eller förlust, som manifesterar sig genom knappen "SPELA IGEN".
function resetGame() {
  letterCorrect = [];
  letterIncorrect = [];

  guesses = 0; // Nollställer mina gissningar

  // Tar bort disabled på alla knappar
  const btn = document.querySelectorAll("#letterButtons > li > button");
  for (let i = 0; i < btn.length; i++) {
    btn[i].disabled = false;
  }
  hangmanImg.src = "images/h0.png";
  message.innerHTML = "";
}
