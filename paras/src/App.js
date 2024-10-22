import React, { useState, useEffect } from "react";
import "./App.css";

const initialBoard = Array(9).fill(null);
const winSound = new Audio('win-sound1.wav'); 

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [theme, setTheme] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [gameMode, setGameMode] = useState(null); 
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [isPlayerSetupComplete, setIsPlayerSetupComplete] = useState(false);

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
        setWinner(player === 'X' ? player1 : player2);
        winSound.play();
        if (player === 'X') {
          setXWins(xWins + 1);
        } else {
          setOWins(oWins + 1);
        }
        return;
      }
    }
    if (board.every((cell) => cell !== null) && !winner) {
      setDraw(true);
      winSound.play();
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setDraw(false);
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const startMultiplayerSetup = () => {
    setGameMode("multiplayer");
    setIsPlayerSetupComplete(false);
  };

  const confirmPlayers = () => {
    setPlayer1(player1Name || "Player 1");
    setPlayer2(player2Name || "Player 2");
    setIsPlayerSetupComplete(true);
  };

  const handleRestart = () => {
    resetGame();
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {board[index]}
      </div>
    );
  };

  if (gameMode === null) {
    return (
      <div className={`app ${isDarkMode ? "dark" : ""}`}>
        <div className="header">
          <h1 className="title">Tic Tac Toe</h1>
          <label className="toggle">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
          <div className="theme-toggle">
            <button onClick={() => handleThemeChange('system')}>System</button>
            <button onClick={() => handleThemeChange('light')}>Light</button>
            <button onClick={() => handleThemeChange('dark')}>Dark</button>
          </div>
        </div>
        <div className="mode-selection">
          <button onClick={startMultiplayerSetup}>Start Multiplayer</button>
          <button onClick={() => setGameMode("ai")}>Play against AI</button>
        </div>
      </div>
    );
  }

  if (gameMode === "multiplayer" && !isPlayerSetupComplete) {
    return (
      <div className={`app ${isDarkMode ? "dark" : ""}`}>
        <div className="header">
          <h1 className="title">Tic Tac Toe</h1>
        </div>
        <div className="player-setup">
          <h2>Enter Player Names</h2>
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <button onClick={confirmPlayers}>Confirm Players</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>
      </div>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner && (
        <div className="winner">
          <h2>{winner} wins!</h2>
        </div>
      )}
      {draw && !winner && (
        <div className="draw">
          <h2>It's a draw!</h2>
        </div>
      )}
      <button onClick={handleRestart}>Restart Game</button>
      <div className="scores">
        <h3>{player1}: {xWins}</h3>
        <h3>{player2}: {oWins}</h3>
      </div>
    </div>
  );
};

export default App;
