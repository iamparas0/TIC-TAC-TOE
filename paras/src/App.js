import React, { useState } from 'react';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        setShowPopup(true); // Show popup on win
        return;
      }
    }
    if (board.every(cell => cell !== null) && !winner) {
      setDraw(true);
      setShowPopup(true); // Show popup on draw
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setDraw(false);
    setShowPopup(false); // Reset popup state
  };

  const renderCell = (index) =>  {
    const value = board[index];
    return (
      <div className="cell" onClick={() => handleCellClick(index)}>
        {value}
      </div>
    );
  };

  const toggleTheme = () => {
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
        {board.map((cell, index) => renderCell(index))}  
      </div>      

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            {winner ? (
              <h2>Congratulations! Player {winner} Wins! 🎉</h2>
            ) : (
              <h2>It's a Draw! 🤝</h2>
            )}
            <button onClick={resetGame}>Play Again</button>
          </div>
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

      {/* CSS Styles */}
      <style>{`
        /* Base styles */
        .app {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          transition: background-color 0.3s;
        }

        .app.dark {
          background-color: #2c2c2c;
        }

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 500px;
          padding: 10px;
        }

        .title {
  text-align: center;
  font-size: 2.5rem;
  margin: 0;
  color: #333;
}


        .app.dark .title {
          color: #fff;
        }

        .toggle {
  position: absolute; /* Or use 'fixed' if you want it to stay in place when scrolling */
  right: 10px;
  width: 40px;
  height: 20px;
}


        .toggle input {
          display: none;
        }

        .toggle .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 20px;
        }

        .toggle input:checked + .slider {
          background-color: #4caf50;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          grid-template-rows: repeat(3, 100px);
          gap: 5px;
          margin: 20px 0;
        }

        .cell {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          background-color: #fff;
          border: 2px solid #ccc;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        .app.dark .cell {
          background-color: #444;
          color: #fff;
          border-color: #666;
        }

        .cell:hover {
          background-color: #ddd;
        }

        .app.dark .cell:hover {
          background-color: #555;
        }

        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-content {
          background-color: #fff;
          padding: 30px;
          border-radius: 10px;
          text-align: center;
        }

        .popup-content h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .popup-content button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .popup-content button:hover {
          background-color: #45a049;
        }

        .rules {
          margin-top: 20px;
          text-align: left;
        }

        .rules h2 {
          color: #333;
        }

        .footer {
          margin-top: 30px;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default App;
