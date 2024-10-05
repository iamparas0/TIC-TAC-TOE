import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  const handleCellClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        return;
      }
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
      <div className="cell" onClick={() => handleCellClick(index)}>
        {value}
      </div>
    );
  };

  const toggleTheme = () =>{
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>

        <label className="toggle">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index} // Unique key for each cell
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      
      {winner && (
        <div className="winner-message">
          <p>Player {winner} wins!</p>
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
        <p>&copy; 2023 TIC TAC TOE . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
