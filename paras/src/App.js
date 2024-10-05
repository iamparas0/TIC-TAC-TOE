import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const handleCellClick = (index) => {
    if (board[index] || winner || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    checkDraw(newBoard);
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        setWinningCells(combination);  // Set the winning cells
        return;
      }
    }
  };

  const checkDraw = (board) => {
    if (board.every(cell => cell !== null) && !winner) {
      setIsDraw(true);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
    setWinningCells([]);  // Reset the winning cells
  };

  const renderCell = (index) => {
    const value = board[index];
    const isWinningCell = winningCells.includes(index);  // Check if the cell is part of the winning combination
    return (
      <div
        className={`cell ${isWinningCell ? 'winning-cell' : ''}`}
        onClick={() => handleCellClick(index)}
      >
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
          <p>Player {winner} wins!</p>
        </div>
      )}
      {isDraw && !winner && (
        <div className="draw-message">
          <p>The game is a draw!</p>
        </div>
      )}

      <button onClick={resetGame}>Restart Game</button>
      
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
