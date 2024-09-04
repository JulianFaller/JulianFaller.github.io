const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];

// Zugriff auf die Input-Felder über die ID
const player1Input = document.getElementById('PlayerX');
const player2Input = document.getElementById('PlayerO');

const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
board.after(endMessage);

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;

        // Die aktuellen Namen dynamisch auslesen
        const player1Name = player1Input.value || 'X';
        const player2Name = player2Input.value || 'O';

        if (checkWin(currentPlayer)) {
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
            endMessage.textContent = `Game over! ${winnerName} wins!`;
            return;
        }

        if (checkTie()) {
            endMessage.textContent = `Game is tied!`;
            return;
        }

        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        const nextPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        endMessage.textContent = `${nextPlayerName}'s turn!`;
    });
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restartButton() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
    currentPlayer = players[0];
    
    // Die aktuellen Namen dynamisch auslesen
    const player1Name = player1Input.value || 'X';
    const player2Name = player2Input.value || 'O';

    endMessage.textContent = `${player1Name}'s turn!`;
}
