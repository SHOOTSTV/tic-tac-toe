// Gameboard module (IIFE)
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""]; // 3x3 grid

  const getBoard = () => board;

  const playMove = (position, symbol) => {
    if (position < 0 || position > 8) {
      console.log("Invalid position !");
      return false;
    }

    if (board[position] === "") {
      board[position] = symbol;
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) board[i] = "";
  };

  return { getBoard, playMove, resetBoard };
})();

// GameController module (IIFE)
const GameController = (() => {
  let currentPlayer = "X";
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => {
    const board = Gameboard.getBoard();
    return !board.includes("");
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = "X";
    gameOver = false;
  };

  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;

  return {
    switchPlayer,
    checkWinner,
    checkDraw,
    resetGame,
    getCurrentPlayer,
    isGameOver,
  };
})();

// DisplayController module (IIFE)
const DisplayController = (() => {
  let cells = [];

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
    });
  };

  const updateMessage = (message) => {
    document.getElementById("message").textContent = message;
  };

  const handleCellClick = (event) => {
    if (GameController.isGameOver()) return;

    const cellIndex = parseInt(event.target.dataset.index);
    const board = Gameboard.getBoard();

    if (board[cellIndex] === "") {
      Gameboard.playMove(cellIndex, GameController.getCurrentPlayer());
      renderBoard();

      if (GameController.checkWinner()) {
        updateMessage(`Player ${GameController.getCurrentPlayer()} wins!`);
        return;
      }

      if (GameController.checkDraw()) {
        updateMessage("It's a draw!");
        return;
      }

      GameController.switchPlayer();
      updateMessage(`Player ${GameController.getCurrentPlayer()}'s turn`);
    }
  };

  const resetGame = () => {
    GameController.resetGame();
    updateMessage("Player X's turn");
    renderBoard();
  };

  const init = () => {
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });

    document.getElementById("reset-btn").addEventListener("click", resetGame);
    updateMessage("Player X's turn");
    renderBoard();
  };

  return { init, renderBoard };
})();

document.addEventListener("DOMContentLoaded", () => {
  DisplayController.init();
});
