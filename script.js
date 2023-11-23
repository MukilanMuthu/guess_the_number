'use strict';

// number selection
let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

// dom selection
const questionMark = document.querySelector('.number');
const message = document.querySelector('.message');
const scoreBoard = document.querySelector('.score');
const highScoreBoard = document.querySelector('.highscore');

//reset function
function reset(){
    questionMark.textContent = '?';
    secretNumber = Math.trunc(Math.random()*20)+1;
    score = 20;
    scoreBoard.textContent = score;
    document.querySelector('.guess').value = '';
    message.textContent = 'Start guessing...';
}

//game over function
function gameOver(){
    message.textContent = 'Game over';
    questionMark.textContent = secretNumber;
}

//game function
function game(){
    const guess = Number(document.querySelector('.guess').value);
    if (!guess){
        message.textContent = 'Enter a number';
    }
    if (guess > 20 || guess < 1){
        message.textContent = 'Enter a number between 1 and 20';
    }else if (score <= 0){ // game over condition
        message.textContent = 'Press "Again!" to restart';
        questionMark.textContent = secretNumber;
    }else if (guess===secretNumber){
        message.textContent = 'Hooray';
        questionMark.textContent = secretNumber;
        if(score > highScore){
            highScore = score;
            highScoreBoard.textContent = highScore;
        }
    }else{
        if (guess < secretNumber){
            if (guess === secretNumber-1){
                message.textContent = 'Almost there';
            }else{
                message.textContent = 'Guess higher';
            }
            score--;
            if (score <= 0){
                gameOver();
            }
            scoreBoard.textContent = score;
        }
        if (guess > secretNumber){
            if (guess === secretNumber+1){
                message.textContent = 'Almost there';
            }else{
                message.textContent = 'Guess lower';
            }
            score--;
            if (score <= 0){
                gameOver();
            }
            scoreBoard.textContent = score;
        }
    }
}

// adding event listeners
document.querySelector('.check').addEventListener('click', game);
// keyboard input listener
document.onkeyup = function(e){
    if(e.key == 'Enter'){
       game();
    }
}
// reset the game without losing highscore
document.querySelector('.again').addEventListener('click', reset);
