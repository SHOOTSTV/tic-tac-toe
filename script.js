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
      console.log("❌ This case is already taken !");
      return false;
    }
  };

  const displayBoard = () => {
    console.log(`
 ${board[0] || "1"} | ${board[1] || "2"} | ${board[2] || "3"}
-----------
 ${board[3] || "4"} | ${board[4] || "5"} | ${board[5] || "6"}
-----------
 ${board[6] || "7"} | ${board[7] || "8"} | ${board[8] || "9"}
    `);
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) board[i] = "";
  };

  return { getBoard, playMove, displayBoard, resetBoard };
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
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log(`🎉 The player ${board[a]} has won !`);
        gameOver = true;
        return true;
      }
    }

    if (!board.includes("")) {
      console.log("😐 Draw !");
      gameOver = true;
      return true;
    }

    return false;
  };

  const playTurn = (position) => {
    if (gameOver) {
      console.log("🛑 Game over ! Start a new game.");
      return;
    }

    if (Gameboard.playMove(position, currentPlayer)) {
      Gameboard.displayBoard();

      if (!checkWinner()) {
        switchPlayer();
        console.log(`➡️ It's ${currentPlayer}'s turn !`);
      }
    }
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = "X";
    gameOver = false;
    console.log("🔄 New game !");
    Gameboard.displayBoard();
  };

  // Function to start the game with a prompt
  const startGame = () => {
    resetGame();

    while (!gameOver) {
      let input = prompt(`Player ${currentPlayer}, choose a case (1-9) :`);
      if (input === null) break;
      let position = parseInt(input) - 1;

      if (isNaN(position) || position < 0 || position > 8) {
        console.log("⚠️ Invalid input !");
        continue;
      }

      playTurn(position);
    }

    console.log("🏁 Game over !");
  };

  return { startGame, resetGame };
})();

GameController.startGame();
