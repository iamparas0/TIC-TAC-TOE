import React, { useState, useEffect } from 'react';
import './App.css';
import Sparkle from './Sparkle';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [theme, setTheme] = useState('system');
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


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gameMode, setGameMode] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (selectedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDarkMode);
    }
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
  };

  // State variables for win count
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const handleCellClick = (index) => {
    if (board[index] || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Check if there's a winner
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

        if (player === 'X') {
          setXWins(xWins + 1); // Increment X's win count
        } else {
          setOWins(oWins + 1); // Increment O's win count
        }
        updateScoreAndHighestScore(player); // Update score and highest score

        return;
      }
    }
    if (board.every(cell => cell !== null) && !winner) {
      setDraw(true);
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
    setDraw(false);
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

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
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
          <div className="theme-toggle">
            <button 
              className={`theme-button ${theme === 'system' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('system')}
            >
              <span role="img" aria-label="System">💻</span>
            </button>
            <button 
              className={`theme-button ${theme === 'light' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('light')}
            >
              <span role="img" aria-label="Light">☀️</span>
            </button>
            <button 
              className={`theme-button ${theme === 'dark' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('dark')}
            >
              <span role="img" aria-label="Dark">🌙</span>
            </button>
          </div>
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
        <div className="theme-toggle">
          <button 
            className={`theme-button ${theme === 'system' ? 'active' : ''}`} 
            onClick={() => handleThemeChange('system')}
          >
            <span role="img" aria-label="System">💻</span>
          </button>
          <button 
            className={`theme-button ${theme === 'light' ? 'active' : ''}`} 
            onClick={() => handleThemeChange('light')}
          >
            <span role="img" aria-label="Light">☀️</span>
          </button>
          <button 
            className={`theme-button ${theme === 'dark' ? 'active' : ''}`} 
            onClick={() => handleThemeChange('dark')}
          >
            <span role="img" aria-label="Dark">🌙</span>
          </button>
        </div>
      </div>


      <div className="winner-counter">
        <div className={winner === 'X' ? 'winner-highlight' : ''}>
          X Wins: {xWins}
        </div>
        <div className={winner === 'O' ? 'winner-highlight' : ''}>
          O Wins: {oWins}
        </div>
      </div>

      <button className="back-button" onClick={handleBackButton}>
        ← Back to Mode Selection
      </button>



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
<

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
=
      {draw && (
        <div className="draw-message">
          <p>It's a draw!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
      <div className="rules-card">
>
        <h2>Rules</h2>
        <ul>
          <li>Two players take turns marking cells in a 3x3 grid.</li>
          <li>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</li>
          <li>If all cells are filled and no player has three marks in a row, the game is a draw.</li>
        </ul>
      </div>

      <Sparkle mousePosition={mousePosition} />


      <footer className="footer">
        <p>&copy; 2023 TIC TAC TOE. All rights reserved to Paras Vishwakarma.</p>
      </footer>

      <Sparkle x={mousePosition.x} y={mousePosition.y} />

    </div>
  );
};

export default App;
