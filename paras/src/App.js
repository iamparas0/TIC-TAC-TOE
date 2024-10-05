import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningCombination, setWinningCombination] = useState([]);

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoveHistory([...moveHistory, { player: currentPlayer, move: index }]);

    if (!checkWinner(newBoard, currentPlayer)) {
      if (newBoard.every((cell) => cell !== null)) {
        setIsDraw(true);
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        setWinningCombination(combination);
        setScores((prevScores) => ({ ...prevScores, [player]: prevScores[player] + 1 }));
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    if (window.confirm('Are you sure you want to restart the game?')) {
      setBoard(initialBoard);
      setCurrentPlayer('X');
      setWinner(null);
      setIsDraw(false);
      setMoveHistory([]);
      setWinningCombination([]);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const renderCell = (index) => {
    const value = board[index];
    const isWinningCell = winningCombination.includes(index);

    return (
      <div
        className={ `cell ${isWinningCell ? 'winning-cell' : ''}` }
        onClick={ () => handleCellClick(index) }
        role="button"
        tabIndex={ 0 }
        aria-label={ `cell-${index}` }
        onKeyDown={ (e) => e.key === 'Enter' && handleCellClick(index) }
      >
        { value }
      </div>
    );
  };

  return (
    <div className={ `app ${isDarkMode ? 'dark' : ''}` }>
      <div className="header">
        <h1 className="title">Tic Tac Toe</h1>
        <div className="theme-toggle">
          <label className="toggle">
            <input type="checkbox" checked={ isDarkMode } onChange={ toggleTheme } />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="score-board">
        <p>Player X: { scores.X } Wins</p>
        <p>Player O: { scores.O } Wins</p>
      </div>

      <div className="board">
        { board.map((_, index) => renderCell(index)) }
      </div>

      { winner && (
        <div className="winner-message">
          <p>Player { winner } wins!</p>
          <button onClick={ resetGame }>Restart</button>
        </div>
      ) }

      { isDraw && !winner && (
        <div className="winner-message">
          <p>It's a draw!</p>
          <button onClick={ resetGame }>Restart</button>
        </div>
      ) }

      <div className="move-history">
        <h2>Move History</h2>
        <ul>
          { moveHistory.map((move, index) => (
            <li key={ index }>
              Player { move.player } moved to position { move.move + 1 }
            </li>
          )) }
        </ul>
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
        <p>&copy; 2024 TIC TAC TOE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
