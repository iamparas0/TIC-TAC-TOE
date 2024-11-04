

import React, { useState, useEffect } from 'react';
import './App.css'; 
import Sparkle from './Sparkle'; // If Sparkle is not used, you can remove this import.
import { Link } from 'react-router-dom';


import React, { useState, useEffect } from "react";
import "./App.css";
import Sparkle from "./Sparkle"; // If Sparkle is not used, you can remove this import.
import { Link } from "react-router-dom";

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [theme, setTheme] = useState("system");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scorePlayerX, setScorePlayerX] = useState(0);
  const [scorePlayerO, setScorePlayerO] = useState(0);
  const [highestScorePlayerX, setHighestScorePlayerX] = useState(0);
  const [highestScorePlayerO, setHighestScorePlayerO] = useState(0);
  const [gameMode, setGameMode] = useState(null);

  const [gameHistory, setGameHistory] = useState([]); // Added game history state


  // Handle click on a cell
  const handleCellClick = (index) => {
    if (board[index] || winner || draw) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    checkWinner(newBoard, currentPlayer);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");


    if(gameMode==='multiplayer')
    {
      setCurrentPlayer(currentPlayer === 'X'?'O':'X');
    }

    if(gameMode==='ai')
    {
      setTimeout(()=>{
        aiTurn(newBoard);
      },400);
    }
    
  };

  const aiTurn=(currentBoard) => {
    const availableMoves=currentBoard
      .map((cell, index) => (cell===null? index : null))
      .filter((index) => index !== null);

    if (availableMoves.length===0) 
    {
        return;
    } 
    const aiMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
    const newBoard = [...currentBoard];
    newBoard[aiMove]='O';
    setBoard(newBoard);
    checkWinner(newBoard,'O');
    setCurrentPlayer('X');

  };

  // Check if there's a winner
  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        updateScoreAndHighestScore(player);
        setDraw(false);
        return;
      }
    }
    if (board.every((cell) => cell !== null) && !winner) {
      setDraw(true);
    }
  };

  // Update score and highest score
  const updateScoreAndHighestScore = (player) => {
    if (player === "X") {
      const newScoreX = scorePlayerX + 1;
      setScorePlayerX(newScoreX);
      if (newScoreX > highestScorePlayerX) {
        setHighestScorePlayerX(newScoreX);
      }
    } else if (player === "O") {
      const newScoreO = scorePlayerO + 1;
      setScorePlayerO(newScoreO);
      if (newScoreO > highestScorePlayerO) {
        setHighestScorePlayerO(newScoreO);
      }
    }
  };

  // Update game history
  const updateGameHistory = (board) => {
    let updatedHistory = [...gameHistory, board];
    if (updatedHistory.length > 3) {
      updatedHistory = updatedHistory.slice(1); // Keep only the last 3 games
    }
    setGameHistory(updatedHistory);
  };

  // Reset the game but keep the scores intact
  const resetGame = () => {
    if (winner || draw) {
      updateGameHistory(board); // Store the finished game in history
    }
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setDraw(false);
  };

  // Handle theme changes
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    applyTheme(selectedTheme);
  };

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === "dark") {
      setIsDarkMode(true);
    } else if (selectedTheme === "light") {
      setIsDarkMode(false);
    } else {
      const systemDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(systemDarkMode);
    }
  };
  const resetApp = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false);
    setScorePlayerX(0);
    setScorePlayerO(0);
    setGameMode(null); // Reset game mode selection
  };
  

  // Setup initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Render each cell
  const renderCell = (index) => {
    const value = board[index];
    const cellStyle = {
      backgroundColor: value === 'X' ? '#40E0D0' : value === 'O' ? '#FA8072' : 'white',
      // color: value === 'O' ? 'blue' : 'black',
    };
  
    return (
      <div 
        className="cell" 
        onClick={() => handleCellClick(index)} 
        style={cellStyle}
      >
        {value}
      </div>
    );
  };    

  // Render game history
  const renderHistory = () => {
    return gameHistory.map((pastGame, index) => (
      <div key={index} className="history-box">
        <h3>Game {index + 1}</h3>
        <div className="history-board">
          {pastGame.map((cell, cellIndex) => (
            <div key={cellIndex} className="history-cell">
              {cell}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  // Game Mode selection
  const handleBackButton = () => {
    setGameMode(null);
    resetGame();
  };

  if (gameMode === null) {
    return (
      <div className={`app ${isDarkMode ? "dark" : ""}`}>
        <div className="header">
          <a href=""></a>
          <div class="navbar-logo">
            <img
              src="https://www.svgrepo.com/show/143264/tic-tac-toe-game.svg"
              alt="Tic Tac Toe Logo"
              class="logo"
            />
            <h1 class="navbar-title">Tic Tac Toe</h1>
          </div>
          <div class="navbar">

            <div class="navbar-links">
              <Link to="/home" class="nav-link">
                Home
              </Link>
              <Link to="/about" class="nav-link">
                About
              </Link>
              <Link to="/rules" class="nav-link">
                Rules
              </Link>
              <Link to="/contact" class="nav-link">
                Contact
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/Login" className="nav-link">
                Log In
              </Link>

              <div class="navbar-links">
                <Link to="/" class="nav-link">Home</Link>
                <Link to="/about" class="nav-link">About</Link>
                <Link to="/rules" class="nav-link">Rules</Link>
                <Link to="/contact" class="nav-link">Contact</Link>
                <Link to="/signup" className='nav-link'>Sign Up</Link>
                <Link to="/Login" className='nav-link'>Log In</Link>
              </div>

            </div>
          </div>

          <div className="theme-toggle">
            <button
              className={`theme-button ${theme === "system" ? "active" : ""}`}
              onClick={() => handleThemeChange("system")}
            >
              <span role="img" aria-label="System">
                💻
              </span>
            </button>
            <button
              className={`theme-button ${theme === "light" ? "active" : ""}`}
              onClick={() => handleThemeChange("light")}
            >
              <span role="img" aria-label="Light">
                ☀️
              </span>
            </button>
            <button
              className={`theme-button ${theme === "dark" ? "active" : ""}`}
              onClick={() => handleThemeChange("dark")}
            >
              <span role="img" aria-label="Dark">
                🌙
              </span>
            </button>
          </div>
        </div>
        <div className="mode-selection">
          <h2>Choose Game Mode</h2>
          <button onClick={() => setGameMode("multiplayer")}>
            Multiplayer
          </button>
          <button onClick={() => setGameMode("ai")}>Play against AI</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>
      </div>
      <div className={draw === false ? "winner-counter" : ""}>
        <div
          className={
            draw === false
              ? winner === "X"
                ? "winner-counter winner-highlight"
                : ""
              : "winner-counter draw-highlight"
          }
        >
          {draw === false ? `X Wins: ${scorePlayerX} ` : "It's a draw"}
        </div>
        <div
          className={
            draw === false
              ? winner === "O"
                ? "winner-counter winner-highlight"
                : ""
              : ""
          }
        >
          {draw === false ? `Y Wins: ${scorePlayerX}` : ""}
        </div>
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

      {draw && !winner && (
        <div className="draw-message">
          <p>It's a draw!</p>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}


      {/* Game History Section */}
      {gameMode === 'multiplayer' && (
        <div className="game-history">
          <h2>Game History (Last 3 Games)</h2>
          {renderHistory()}
        </div>
      )}

          <button className="replay-button" onClick={resetGame}>Replay</button>
      </div>
    )}

      <div className="winner-message">
  {winner && <p>Player {winner} wins!</p>}
  {draw && <p>It's a draw!</p>}
  <button onClick={resetGame}>Restart Game</button>
  <button onClick={resetApp}>Restart App</button> {/* New Reload Button */}
</div>




    </div>
  );
};

export default App;