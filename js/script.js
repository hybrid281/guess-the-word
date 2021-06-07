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

let word = "magnolia"; // default word to start with
let guessedLetters = [];
let remainingGuesses = 8; // max amount of guesses allowed


const getWord = async function() {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomWordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWordIndex].trim();
    placeholder(word);
}

getWord();

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("•");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


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
    //function used to validate entry
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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessList.innerHTML = ""; //clear the list
    for(const letter of guessedLetters) {
        const li = document.createElement("li"); //create list item
        li.innerText = letter;
        guessList.append(li); 
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = []; //create new array to take correct guesses
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
          revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("•")
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkForWin();
};


const updateGuessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good job! The word does have ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessRemainDisplay.innerText = `${remainingGuesses} guesses`;
    } else {
        guessRemainDisplay.innerText = `${remainingGuesses} guesses`;
    }
};

const checkForWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win"); //add win class to the "message" DOM query
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    guessRemainShow.classList.add("hide");
    guessList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //reset values and select new word
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters = [];
    remainingGuesses = 8;
    guessRemainDisplay.innerText = `${remainingGuesses} guesses`;
    guessList.innerHTML = "";
    getWord();

    //reset the UI elements
    playAgainButton.classList.add("hide");
    guessButton.classList.remove("hide");
    guessRemainShow.classList.remove("hide");
    guessList.classList.remove("hide");
});