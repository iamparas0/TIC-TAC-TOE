import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    // Check if the cell is already filled or if there's a winner
    if (board[index] || winner) return;

    // Create a new board and set the current player's mark
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for a winner after the move
    checkWinner(newBoard, currentPlayer);

    // Switch the current player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // Check all winning combinations
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        return;
      }
    }

    // Check for a draw
    if (!board.includes(null)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className="cell" onClick={() => handleCellClick(index)} key={index}>
        {value}
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
      {winner && (
        <div className="winner-message">
          <p>{winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      <div className="rules">
        <h2>Rules</h2>
        <ul>
          <li>Two players take turns marking cells in a 3x3 grid.</li>
          <li>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</li>
          <li>If all cells are filled and no player has three marks in a row, the game is a draw.</li>
        </ul>
      </div>
      <footer className="footer">
        <p>&copy; 2023 Your Game Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
