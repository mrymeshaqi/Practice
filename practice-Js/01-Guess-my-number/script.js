'use string';

// State variable
let securityNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const $ = document;
function displayMessage(message) {
  $.querySelector('.message').textContent = message;
}

$.querySelector('.check').addEventListener('click', function () {
  const guess = +$.querySelector('.guess').value;

  // Whin there is no input
  if (!guess) {
    displayMessage('❌ No Number');

    // When player wins
  } else if (guess === securityNumber) {
    displayMessage('🏆 correct Number');
    $.querySelector('.number').textContent = securityNumber;
    $.querySelector('body').style.backgroundColor = '#60b347';
    $.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      $.querySelector('.highscore').textContent = highScore;
    }

    // When guess is wrong
  } else if (guess !== securityNumber) {
    if (score > 1) {
      displayMessage(guess > securityNumber ? '📈 Too high!' : '📉 Too Low!');
      score--;
      $.querySelector('.score').textContent = score;
    } else {
      displayMessage('🔥 You lost the game!');
      $.querySelector('.score').textContent = 0;
      $.querySelector('body').style.backgroundColor = '#e53f3f';
    }
  }
});

$.querySelector('.again').addEventListener('click', function () {
  $.querySelector('body').style.backgroundColor = '#222';
  $.querySelector('.guess').value = '';
  securityNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  $.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  $.querySelector('.number').textContent = '?';
  $.querySelector('.number').style.width = '15rem';
});
