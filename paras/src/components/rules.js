import React from 'react';
import './rules.css';

const Rules = ({ isDarkMode }) => (
  <div className={`rules-page ${isDarkMode ? 'dark' : ''}`}>
    <h1>How to Play Tic Tac Toe</h1>
    <ul>
      <li>The game is played on a 3x3 grid.</li>
      <li>Two players take turns—one plays as 'X' and the other as 'O'.</li>
      <li>The goal is to get three of your marks in a row, column, or diagonal.</li>
      <li>If all 9 squares are filled and no player has three in a row, the game ends in a draw.</li>
      <li>Players alternate turns until either one player wins or the game ends in a draw.</li>
    </ul>
  </div>
);

export default Rules;
