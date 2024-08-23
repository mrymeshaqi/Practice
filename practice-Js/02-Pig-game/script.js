'use strict';

const $ = document;
const btnNew = $.querySelector('.btn--new');
const btnRoll = $.querySelector('.btn--roll');
const btnHold = $.querySelector('.btn--hold');
const imgDise = $.querySelector('.dice');
const player0 = $.querySelector('.player--0');
const player1 = $.querySelector('.player--1');
const firstPlayerScore = $.querySelector('#score--0');
const secondPlayerScore = $.querySelector('#score--1');
const firstCurrentScore = $.querySelector('#current--0');
const secondCurrentScore = $.querySelector('#current--1');

// State
let randomDise, currentNumber, activePlayer, scores, isPlaying;

// Starting / initialization
const init = function () {
  randomDise = 0;
  currentNumber = 0;
  activePlayer = 0;
  scores = [0, 0];
  isPlaying = true;
  firstPlayerScore.textContent = 0;
  secondPlayerScore.textContent = 0;
  firstCurrentScore.textContent = 0;
  secondCurrentScore.textContent = 0;
  imgDise.style.display = 'none';
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentNumber = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // Random number and Set image
    randomDise = Math.trunc(Math.random() * 6 + 1);
    imgDise.src = `image/dice-${randomDise}.png`;
    imgDise.style.display = 'block';

    // Box Current and Add dise to current score
    if (randomDise !== 1) {
      currentNumber += randomDise;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentNumber;
      // Current player active ↑↑
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentNumber;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      isPlaying = false;
      imgDise.style.display = 'none';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
