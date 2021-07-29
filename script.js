'use strict';

// Selecionando Elementos
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

// Condições iniciais
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Função botão Hold
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


// Função rolar os dados
btnRoll.addEventListener('click', function() {
    if(playing) {
    //1. Gerar um dado aleatório
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Mostrar o valor do dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Se o valor for diferente de 1
    if(dice !== 1) {
    // Mostrar o dado de acordo com o valor
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
    //mudar a vez do jogador
    switchPlayer();}
}
});

btnHold.addEventListener('click', function() {
    if(playing) {
    //1. Add a pontuação atuaç do jogador ativo ao placar dele
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. Checar se o placar do jogador é >=100
    if(scores[activePlayer] >= 100) {
    // Finalizar o jogo
    playing = false;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
} else {
    // Senão, trocar pra outro jogador
    switchPlayer();
    }
}
});

// Botão New game
btnNew.addEventListener('click', function(){
    //Novo Jogo e background inicial
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active'); 
    playing = true;
    //Resetar a pontuação
    scores = [0,0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    //Resetar a pontuação atual
    currentScore = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    //Esconder o dado 
    diceEl.classList.add('hidden');
    //Fazer o Player 0 ser o jogador ativo
    if(activePlayer === 1) {
        switchPlayer();           
    };
});