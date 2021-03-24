'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling dice functionality
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
    //remove dice
    diceEl.classList.add('hidden');
    //all scores should be 0
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    // scores = [0, 0];
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    // active player is player 0
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');


}

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. generating a radom dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. chcek for rolled 1:if true switch to player2
        if (dice !== 1) {
            //add dice to current score
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch to next player
            switchPlayer();

        }
    }

});


btnHold.addEventListener('click', function () {
    if (playing) {
        //1. add current score to active pplayer score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2. check if player score is 100
        if (scores[activePlayer] >= 100) {
            //3. finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //4. switch to next player
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', init);