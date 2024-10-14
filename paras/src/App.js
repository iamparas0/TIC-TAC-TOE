
import React, { useState, useEffect } from 'react';
import './App.css';
import Sparkle from './Sparkle';
import useScoreTracker from './ScoreTracker';






const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
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

  const [draw, setDraw] = useState(false);
  const [theme, setTheme] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gameMode, setGameMode] = useState(null);


//initialize score trackers for both players using custom hook
  const playerXScore = useScoreTracker();
  const playerOScore = useScoreTracker();

  // States to store the highest scores, starting from 0 on page refresh
  const [highestScorePlayerX, setHighestScorePlayerX] = useState(0);
  const [highestScorePlayerO, setHighestScorePlayerO] = useState(0);



  // Handle click on a cell
  const handleCellClick = (index) => {
    if (board[index] || winner) return;


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [gameMode, setGameMode] = useState(null); // 'multiplayer' or 'ai'
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

        setWinner(player === "X" ? player1 : player2);
        return;
      }
    }
    if (board.every((cell) => cell !== null) && !winner) {
      setDraw(true);


        setWinner(player === 'X' ? playerX || "X": playerO || "O");
        if (player === 'X') {
          setPlayerXScore(prevScore => prevScore + 1);
        } else {
          setPlayerOScore(prevScore => prevScore + 1);
        }

        setWinner(player);

        if (player === 'X') {
          playerXScore.increaseScore(); // Increment X's win count
          setXWins(xWins+1);
        } else {
          playerOScore.increaseScore()
          setOWins(oWins+1); // Increment O's win count
        }
        // updateScoreAndHighestScore(player); // Update score and highest score


        return;
      }
    }
  };

  // Update score and highest score

  // const updateScoreAndHighestScore = (player) => {
  //   if (player === 'X') {
  //     const newScoreX = playerXScore + 1; // Increment the score for Player X
  //     setScorePlayerX(newScoreX);

  //     // Check if the new score is greater than the highest score, and update if needed
  //     if (newScoreX > highestScorePlayerX) {
  //       setHighestScorePlayerX(newScoreX); // Update highest score
  //     }
  //   } else if (player === 'O') {
  //     const newScoreO = scorePlayerO + 1; // Increment the score for Player O
  //     setScorePlayerO(newScoreO);

  //     // Check if the new score is greater than the highest score, and update if needed
  //     if (newScoreO > highestScorePlayerO) {
  //       setHighestScorePlayerO(newScoreO); // Update highest score
  //     }
  //   }
  // };

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
    setCurrentPlayer("X");
    setWinner(null);
    setFinalWinner(null);
    setPlayerX('Player X');
    setPlayerO('Player O');
    setIsInputVisible(true);
    setPlayerXScore(0); 
    setPlayerOScore(0);
  };


  // Toggle theme (dark/light mode)

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


  const startMultiplayerSetup = () => {
    setGameMode("multiplayer");
    setIsPlayerSetupComplete(false);
  };

  const confirmPlayers = () => {
    setPlayer1(player1Name || "Player 1");
    setPlayer2(player2Name || "Player 2");
    setIsPlayerSetupComplete(true);
  };



  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };


    window.addEventListener("mousemove", handleMouseMove);


    

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (gameMode === "ai" && currentPlayer === "O" && !winner && !draw) {
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
      newBoard[move] = "O";
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
          board[i] = "O";
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
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const checkGameEnd = (board) => {
    if (calculateWinner(board) === "X") return -1;
    if (calculateWinner(board) === "O") return 1;
    if (board.every((cell) => cell !== null)) return 0;
    return null;
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
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

    <div className={`app ${isDarkMode ? 'dark' : ''}`}>


       <div className="header">
          <h1 className="title">Tic Tac Toe</h1>

        <label className="toggle">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
       </div>
    

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


      {/* <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div> */}

<>
          <div>
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
      

       {board.map((cell, index) => renderCell(index))}
       </div>
         </>







      {winner && (
        <div className="winner-message">
          <p>{winner} wins!</p>

          <button onClick={resetGame}>Restart</button>

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
      



    
   //   <div className="current-scores">
   //     <h2>Current Scores</h2>
   //     <p>Player X: {scorePlayerX}</p>
    //    <p>Player O: {scorePlayerO}</p>
   //   </div>

     
  //    <div className="highest-scores">
   //     <h2>Highest Scores</h2>
   //     <p>Player X: {highestScorePlayerX}</p>
   //     <p>Player O: {highestScorePlayerO}</p>
   //   </div>

    //  <div className="rules">
    //  {draw && (
   //     <div className="draw-message">
     //     <p>It's a draw!</p>
     //     <button onClick={resetGame}>Restart</button>
      //  </div>
     // )}

     // <div className="rules-card">

       // <h2>Rules</h2>
      //  <ul>
       //   <li>Two players take turns marking cells in a 3x3 grid.</li>
       //   <li>The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</li>
         // <li>If all cells are filled and no player has three marks in a row, the game is a draw.</li>
        //</ul>
     // </div>

     // <footer className="footer">
    //    <p>&copy; 2023 TIC TAC TOE. All rights reserved to Paras Vishwakarma.</p>
//      </footer>

  //    <Sparkle x={mousePosition.x} y={mousePosition.y} />
    //</div>
  }

};




        <div className='board'>
          {board.map((_,index)=>renderCell(index))}
        </div>
      {/* Display current scores */}
      <div className="current-scores">
        <h2>Current Scores</h2>
        <p>Player X: {playerXScore.score}</p>
        <p>Player O: {playerOScore.score}</p>
      </div>

      {/* Display the highest scores */}
      <div className="highest-scores">
        <h2>Highest Scores</h2>
        <p>Player X: {highestScorePlayerX.highScore}</p>
        <p>Player O: {highestScorePlayerO.highScore}</p>
      </div>


      <div className="rules">




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
          <li>
            The player who succeeds in placing three of their marks in a
            horizontal, vertical, or diagonal row wins the game.
          </li>
          <li>
            If all cells are filled and no player has three marks in a row, the
            game is a draw.
          </li>
        </ul>
      </div>



      <Sparkle mousePosition={mousePosition} />


      <footer className="footer">
        <p>&copy; 2023 TIC TAC TOE. All rights reserved to Paras Vishwakarma.</p>
      </footer>


      <Sparkle x={mousePosition.x} y={mousePosition.y} />

    </div>
    </div>
  );
};

export default App;




