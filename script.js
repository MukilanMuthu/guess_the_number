"use strict";

// number selection
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// dom selection
const questionMark = document.querySelector(".number");
const message = document.querySelector(".message");
const scoreBoard = document.querySelector(".score");
const highScoreBoard = document.querySelector(".highscore");
const body = document.querySelector("body");

//reset function
function reset() {
  body.style.backgroundColor = "#222";
  questionMark.style.width = "15rem";
  questionMark.textContent = "?";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  scoreBoard.textContent = score;
  document.querySelector(".guess").value = "";
  message.textContent = "Start guessing...";
}

//game over function
function gameOver() {
  message.textContent = "Game over";
  body.style.backgroundColor = "#d40000";
  questionMark.style.width = "30rem";
  questionMark.textContent = secretNumber;
}

//game function
function game() {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    message.textContent = "Enter a number";
  }
  // invalid guess
  if (guess > 20 || guess < 1) {
    message.textContent = "Enter a number between 1 and 20";
    // game over condition
  } else if (score <= 0) {
    message.textContent = 'Press "Again!" to restart';
    questionMark.textContent = secretNumber;
    // win condition
  } else if (guess === secretNumber) {
    message.textContent = "Hooray";
    body.style.backgroundColor = "#60b347";
    questionMark.style.width = "30rem";
    questionMark.textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      highScoreBoard.textContent = highScore;
    }
  } else {
    // guess too low
    if (guess < secretNumber) {
      // guess low
      if (guess === secretNumber - 1) {
        message.textContent = "Almost there";
      } else {
        message.textContent = "Guess higher";
      }
      score--;
      // game over
      if (score <= 0) {
        gameOver();
      }
      scoreBoard.textContent = score;
    }
    // guess too high
    if (guess > secretNumber) {
      // guess high
      if (guess === secretNumber + 1) {
        message.textContent = "Almost there";
      } else {
        message.textContent = "Guess lower";
      }
      score--;
      // game over
      if (score <= 0) {
        gameOver();
      }
      scoreBoard.textContent = score;
    }
  }
}

// adding event listeners
document.querySelector(".check").addEventListener("click", game);
// keyboard input listener
document.onkeyup = function (e) {
  if (e.key == "Enter") {
    game();
  }
};
// reset the game without losing highscore
document.querySelector(".again").addEventListener("click", reset);
