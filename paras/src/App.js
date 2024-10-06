import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playerX, setPlayerX] = useState('Player X');
  const [playerO, setPlayerO] = useState('Player O');
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);
  const [finalWinner, setFinalWinner] = useState(null);

const startGame = () => {
  setIsInputVisible(false);
};
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
        setWinner(player === 'X' ? playerX || "X": playerO || "O");
        if (player === 'X') {
          setPlayerXScore(prevScore => prevScore + 1);
        } else {
          setPlayerOScore(prevScore => prevScore + 1);
        }
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setFinalWinner(null);
    setPlayerX('Player X');
    setPlayerO('Player O');
    setIsInputVisible(true);
    setPlayerXScore(0); 
    setPlayerOScore(0);
  };

  const continueGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setCurrentPlayer("X");
  };
  const handleRestart = () => {
    if (playerXScore > playerOScore) {
      setFinalWinner(`${playerX} is the winner!`);
    } else if (playerOScore > playerXScore) {
      setFinalWinner(`${playerO} is the winner!`);
    } else {
      setFinalWinner("It's a Draw!");
    }
    setTimeout(() => {
      resetGame(); 
    }, 2000); 
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
      {isInputVisible ? (
  <div className="player-input">
    <input 
      type="text" 
      placeholder="Player X Name" 
      onChange={(e) => setPlayerX(e.target.value)} 
    />
    <input 
      type="text" 
      placeholder="Player O Name" 
      onChange={(e) => setPlayerO(e.target.value)} 
    />
    <button onClick={startGame}>Start Game</button>
  </div>
) : (
  <div className="current-turn">
    <p>{currentPlayer === 'X' ? playerX : playerO}'s turn</p>
  </div>
)}

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
          <p>{winner} wins!</p>
          <button onClick = {continueGame}>Continue</button>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
      {finalWinner && (
        <div className="final-winner-message">
          <p>{finalWinner}</p>
        </div>
      )}
      <div className="result-board">
        <h2>Scoreboard</h2>
        <p>{playerX}: {playerXScore}</p>
        <p>{playerO}: {playerOScore}</p>
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
