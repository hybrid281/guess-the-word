const guessList = document.querySelector("ul");
// for the unordered list that will contain the guesses
const guessButton = document.querySelector("button");
// button in use for pressing Guess
const guessInput = document.querySelector(".letter");
// used to select the input text element
const wordInProgress = document.querySelector(".word-in-progress");
const guessRemainShow = document.querySelector(".remaining");
const guessRemainDisplay = document.querySelector("span");
const letterGuessDisplay = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia"; // default word to start with

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("•");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e) { 
    e.preventDefault();
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
});