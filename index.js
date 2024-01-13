window.addEventListener("load", function (e) {
  setTimeout(function () {
    alert("Welcome to My Website!");
  }, 2000);
});

const form = document.querySelector("form");
let randomNumber = Math.floor(Math.random() * 100 + 1);
const submitBtn = document.querySelector("#subt");
const previousGuesses = document.querySelector(".guesses");
const GuessesRemaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessNumber = document.getElementById("guessField");
const resultDiv = document.querySelector(".resultParas");

let AllGuesses = [];
let countGuesses = 1;
let para = document.createElement("p");
let playGame = true;
// Default value for attempts
let maxAttempts = 4;
// gameStart
if (playGame) {
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const userInput = parseInt(guessNumber.value);
    validateGuess(userInput);
  });
}

//  validate input
function validateGuess(userInput) {
  if (
    userInput === " " ||
    userInput < 1 ||
    userInput > 100 ||
    isNaN(userInput)
  ) {
    cleanUp(userInput);
    displayMessage(`invalid input!! please input Number between 1 to 100`);
  } else {
    AllGuesses.push(userInput);
    if (countGuesses === maxAttempts) {
      cleanUp(userInput);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      cleanUp(userInput);
      checkGuess(userInput);
    }
  }
}
//  display message tells low or high
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`Your Guess is Absolutely Correct😀😀`);
  } else if (guess < randomNumber) {
    displayMessage(`Your Guess is TOO low 😢`);
  } else if (guess > randomNumber) {
    displayMessage(`Your Guess is TOO high 😲`);
  }
}
//display messsage
function displayMessage(message) {
  lowOrHi.innerHTML = `<h1>${message}</h1>`;
}
// clean input,update prev guess and remaining guess
function cleanUp(guess) {
  if (!isNaN(guess)) {
    guessNumber.value = "";
    previousGuesses.innerHTML += `${guess}  `;
    countGuesses++;
    GuessesRemaining.innerHTML = `${4 - countGuesses} `;
  } else {
    guessNumber.value = "";
  }
}

// endGame
function endGame() {
  guessNumber.value = "";
  guessNumber.setAttribute("disabled", "");
  para.classList.add("button");
  para.innerHTML = `<h1 id="newGameBtn">Start New Game</h1>`;
  resultDiv.appendChild(para);
  playGame = false;
  newGame();
}
//   newGame
function newGame() {
  const newGameBtn = document.querySelector("#newGameBtn");
  newGameBtn.addEventListener("click", function (e) {
    guessNumber.value = "";
    AllGuesses = [];
    countGuesses = 1;
    previousGuesses.innerHTML = "";
    // GuessesRemaining.innerHTML = `${4 - countGuesses}`;
    GuessesRemaining.innerHTML = `${maxAttempts - countGuesses}`;
    guessNumber.removeAttribute("disabled");
    resultDiv.removeChild(para);
    displayMessage(`Best of luck for the new Game `);
    playGame = true;
  });
}
//  this event listener  update maxAttempts when the dropdown changes
const attemptsDropdown = document.getElementById("attempts");
attemptsDropdown.addEventListener("change", function () {
  maxAttempts = parseInt(attemptsDropdown.value);
  GuessesRemaining.innerHTML = `${maxAttempts - countGuesses}`;
});
const restartGamebtn = document.getElementById("restart");
restartGamebtn.addEventListener("click", function () {
  newGame();
});
// const greetingUser = function () {
//   alert("welcome to my Website");
// };
