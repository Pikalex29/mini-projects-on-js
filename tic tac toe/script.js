// Global variables
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

// Function to check if the board is full (all cells are occupied)
function isBoardFull() {
    return board.every(cell => cell !== '');
}

// Function to handle a player's move
function handleMove(position) {
    // If the position is already occupied, return early
    if (board[position] !== '') {
        return;
    }

    // Update the board with the current player's symbol
    board[position] = currentPlayer;

    // Render the updated board
    renderBoard();

    // Check if the current player has won
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        restartGame();
        return;
    }

    // Check if it's a tie (no more empty cells)
    if (board.every(cell => cell !== '')) {
        alert("It's a tie!");
        restartGame();
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // Check for a win or a tie
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        restartGame();
        return;
    }

    if (isBoardFull()) {
        alert("It's a tie!");
        restartGame();
        return;
    }
}

// Function to check if a player has won
function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ];

    for (let combo of winningCombos) {
        if (
            board[combo[0]] === player &&
            board[combo[1]] === player &&
            board[combo[2]] === player
        ) {
            return true;
        }
    }

    return false;
}

// Function to restart the game
function restartGame() {
    board.fill('');
    currentPlayer = 'X';
    renderBoard();
}

// Function to create a restart button and attach an event listener
function createRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', restartGame);
    return restartButton;
}

// Function to render the game board
function renderBoard() {
    const root = document.getElementById('root');
    root.innerHTML = '';

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = board[i];
        cell.addEventListener('click', () => handleMove(i));
        root.appendChild(cell);
    }
    // Append the restart button
    root.appendChild(createRestartButton());
}

// Initial rendering of the game board
renderBoard();