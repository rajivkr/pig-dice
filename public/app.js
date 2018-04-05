/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//document.querySelector(`#current-${activePlayer}`).textContent = dice;
//document.querySelector(`#current-${activePlayer}`).innerHTML = `<em> ${dice} </em>`;
//var x = document.querySelector(`#score-0`).textContent;

let scores, roundScore, activePlayer, previousScore, dice;
let gamePlaying;

var nextPlayer = () => {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;
    roundScore = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector(`.dice`).style.display = 'none';
};

var init = function () {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    gamePlaying = true;
    document.querySelector(`.dice`).style.display = 'none';
    document.getElementById(`score-0`).textContent = 0;
    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;
    document.getElementById(`score-1`).textContent = 0;
    document.getElementById(`name-1`).textContent = 'PLAYER 2';
    document.getElementById(`name-0`).textContent = 'PLAYER 1';
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};
init();
document.querySelector(`.btn-roll`).addEventListener('click', () => {
    if (gamePlaying) {
        previousScore = dice;
        dice = Math.floor(Math.random() * 6) + 1;
        console.log(previousScore, dice);
        if (previousScore === 6 && dice === 6) {
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = 0;
            nextPlayer();
        } else {
            let diceDom = document.querySelector(`.dice`);
            diceDom.style.display = 'block';
            diceDom.src = 'dice-' + dice + '.png';

            if (dice !== 1) {
                roundScore += dice;
                document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
            } else {
                nextPlayer();
            }
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', () => {

    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer].toString();
        if (scores[activePlayer] >= 20) {
            let playerpanel = `.player-${activePlayer}-panel`;
            document.getElementById('name-' + activePlayer).textContent = 'WINNER';
            document.querySelector(playerpanel).classList.add('winner');
            document.querySelector(playerpanel).classList.remove('active');
            document.querySelector(`.dice`).style.display = 'none';
            gamePlaying = false;
        } else
            nextPlayer();
    }

});


document.querySelector('.btn-new').addEventListener('click', init);

