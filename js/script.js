const guessList = document.querySelector(".guessed-letters");
// for the unordered list that will contain the guesses
const guessButton = document.querySelector(".guess");
// button in use for pressing Guess
const guessInput = document.querySelector(".letter");
// used to select the input text element
const wordInProgress = document.querySelector(".word-in-progress");
const guessRemainShow = document.querySelector(".remaining");
const guessRemainDisplay = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia"; // default word to start with
const guessedLetters = [];

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
    //clear the text here ^
    message.innerText = "";

    const guess = guessInput.value;
    //confirm letter value is singular
    const goodGuess = inputAccept(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    guessInput.value = "";
});


const inputAccept = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //check if value is empty
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        //is there more than one letter?
        message.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        //reminder: use "!"" for checking for non-match value
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        //one letter received
      return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    //this converts values to uppercase
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that, try again.";
        //this helps check for repeated guesses
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        //this pushes the guesses to the array for tracking
    }
};