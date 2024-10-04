import React, { useState, useEffect } from 'react';
import './App.css';

// Import audio files
import backgroundMusic from './background2.mp3';
import clickXSoundFile from './clickX.mp3';
import clickOSoundFile from './clickO.mp3';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [musicStarted, setMusicStarted] = useState(false); // State to track music

  // Create Audio instances
  const backgroundAudio = new Audio(backgroundMusic);
  const clickXSound = new Audio(clickXSoundFile);
  const clickOSound = new Audio(clickOSoundFile);

  useEffect(() => {
    backgroundAudio.loop = true; // Loop the background music
    return () => {
      backgroundAudio.pause(); // Stop the music on component unmount
    };
  }, []);

  const startMusic = () => {
    if (!musicStarted) {
      backgroundAudio.play();
      setMusicStarted(true);
    }
  };

  const handleCellClick = (index) => {
    startMusic(); // Start music on first interaction
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);
    
    // Play the respective sound
    if (currentPlayer === 'X') {
      clickXSound.play();
    } else {
      clickOSound.play();
    }

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
    backgroundAudio.currentTime = 0; // Reset music to start
    if (musicStarted) {
      backgroundAudio.play(); // Restart background music
    }
  };

  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
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
        <p>&copy; 2023 TIC TAC TOE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
