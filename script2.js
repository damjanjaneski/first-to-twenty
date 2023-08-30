'use strict';

/*
1. Da se kreiraat variabli za asite DOM elementi sto ke se koristat

2. Da se setiraat site vrednosti na 0

3. Za kockata da se napravi class 'hidden' za da moze da se manipulira

4. Roll Dice btn da se postavi vo funkcija
  4.1 Random broj od 1 do 6 vo varibala dice
  4.2 Ako !==1 se dodava na current score na aktivniot igrac, ako e 1, currentscore stanuva  i se menuva active playerot
  4.3 Switch player kako del od roll button-ot vo slucaj koga e frlen br 1

5. Hold button da se postavi vo funkcija
 5.1 Po klikanjeto na hold ako score+currentscore >= 100, togas active player wins, vo sprotivno score+currentscore i switch player

 6.New Button, da se setiraat site parametri na parametri na 0, da se postavi player1 (0) kako active player, da se otstarni player2 (1) od active.
 */

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let currentScore = 0;

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
};
let scores = [0, 0];

score0El.textContent = currentScore;
score1El.textContent = currentScore;
diceEl.classList.add('hidden');

let activePlayer = 0;

rollBtn.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6 + 1);

  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += +dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  scores[`${activePlayer}`] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[`${activePlayer}`];
  if (scores[`${activePlayer}`] < 100) switchPlayer();
  else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    diceEl.classList.add('hidden');
    rollBtn.disabled = true;
    holdBtn.disabled = true;
  }
});

newBtn.addEventListener('click', function () {
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  scores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  activePlayer = 0;

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  diceEl.classList.add('hidden');
});
