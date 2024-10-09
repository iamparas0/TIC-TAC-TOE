import React, { useState, useEffect } from 'react';
import './App.css';
import Sparkle from './Sparkle';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [theme, setTheme] = useState('system'); // 'light', 'dark', 'system'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gameMode, setGameMode] = useState(null); // 'multiplayer' or 'ai'

  // Detect system theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDarkMode);
    }
  }, []);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    
    if (selectedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (selectedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDarkMode);
    }
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || draw) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
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
        return;
      }
    }
    if (board.every(cell => cell !== null) && !winner) {
      setDraw(true);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false);
  };

  const renderCell = (index) => {
    const value = board[index];
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {value}
      </div>
    );
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && !winner && !draw) {
      const aiMove = getBestMove(board);
      setTimeout(() => {
        handleCellClick(aiMove);
      }, 500);
    }
  }, [currentPlayer, gameMode, winner, draw]);

  const getBestMove = (board) => {
    const availableMoves = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, []);

    let bestScore = -Infinity;
    let bestMove;

    for (let move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const score = minimax(newBoard, 0, false);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = checkGameEnd(board);
    if (result !== null) {
      return result;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const checkGameEnd = (board) => {
    if (calculateWinner(board) === 'X') return -1;
    if (calculateWinner(board) === 'O') return 1;
    if (board.every(cell => cell !== null)) return 0;
    return null;
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleBackButton = () => {
    setGameMode(null);
    resetGame();
  };

  if (gameMode === null) {
    return (
      <div className={`app ${isDarkMode ? 'dark' : ''}`}>
        <div className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <select value={theme} onChange={handleThemeChange}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="mode-selection">
          <h2>Choose Game Mode</h2>
          <button onClick={() => setGameMode('multiplayer')}>Multiplayer</button>
          <button onClick={() => setGameMode('ai')}>Play against AI</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>
        <select value={theme} onChange={handleThemeChange}>
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <button className="back-button" onClick={handleBackButton}>
        ← Back to Mode Selection
      </button>

      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>

      {winner && (
        <div className="winner-message">
          <p>Player {winner} wins!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      {draw && (
        <div className="draw-message">
          <p>It's a draw!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}

      <div className="rules-card">
        <h2>Rules</h2>
        <ul>
          <li>Two players take turns marking cells in a 3x3 grid.</li>
          <li>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</li>
          <li>If all cells are filled and no player has three marks in a row, the game is a draw.</li>
        </ul>
      </div>

      <Sparkle mousePosition={mousePosition} />
    </div>
  );
};

export default App;
