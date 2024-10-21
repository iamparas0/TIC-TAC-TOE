import React from "react";
import "./Rules.css";
const Rules = () => {
  return (
    <div className="rules-container">
      <h1>Tic Tac Toe Rules</h1>
      <ul>
        <li>The game is played on a 3x3 grid.</li>
        <li>Two players take turns: Player 1 is 'X' and Player 2 is 'O'.</li>
        <li>
          The goal is to get three of your marks in a row, column, or diagonal.
        </li>
        <li>
          If all nine squares are filled without a winner, the game ends in a
          draw.
        </li>
        <li>Players cannot mark a square that is already occupied.</li>
        <li>The first player to align three marks wins!</li>
      </ul>
    </div>
  );
};

export default Rules;
