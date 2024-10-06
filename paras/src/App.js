import React, { useState, useEffect } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // States to keep track of scores for each player
  const [scorePlayerX, setScorePlayerX] = useState(0);
  const [scorePlayerO, setScorePlayerO] = useState(0);

  // States to store the highest scores, starting from 0 on page refresh
  const [highestScorePlayerX, setHighestScorePlayerX] = useState(0);
  const [highestScorePlayerO, setHighestScorePlayerO] = useState(0);

  // Handle click on a cell
  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Check if there's a winner
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
        updateScoreAndHighestScore(player); // Update score and highest score
        return;
      }
    }
  };

  // Update score and highest score
  const updateScoreAndHighestScore = (player) => {
    if (player === 'X') {
      const newScoreX = scorePlayerX + 1; // Increment the score for Player X
      setScorePlayerX(newScoreX);

      // Check if the new score is greater than the highest score, and update if needed
      if (newScoreX > highestScorePlayerX) {
        setHighestScorePlayerX(newScoreX); // Update highest score
      }
    } else if (player === 'O') {
      const newScoreO = scorePlayerO + 1; // Increment the score for Player O
      setScorePlayerO(newScoreO);

      // Check if the new score is greater than the highest score, and update if needed
      if (newScoreO > highestScorePlayerO) {
        setHighestScorePlayerO(newScoreO); // Update highest score
      }
    }
  };

  // Reset the game but keep the scores intact
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  // Toggle theme (dark/light mode)
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Render each cell
  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {value}
      </div>
    );
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

      {/* Display current scores */}
      <div className="current-scores">
        <h2>Current Scores</h2>
        <p>Player X: {scorePlayerX}</p>
        <p>Player O: {scorePlayerO}</p>
      </div>

      {/* Display the highest scores */}
      <div className="highest-scores">
        <h2>Highest Scores</h2>
        <p>Player X: {highestScorePlayerX}</p>
        <p>Player O: {highestScorePlayerO}</p>
      </div>

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
