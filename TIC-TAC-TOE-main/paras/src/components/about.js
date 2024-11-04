import React from 'react';


const About = () => (

  <div className={`about-page dark }`}>
    <style>
        {`
    .about-page {
    padding: 30px;
    margin: auto;
    max-width: 800px;
    text-align: center;
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9; /* Light background for light mode */
    color: #333; /* Dark text for light mode */
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    transition: background-color 0.3s, color 0.3s; /* Smooth transition */
  }
  
  .about-page.dark {
    background-color: #2c2c2c; /* Dark background for dark mode */
    color: #f0f0f0; /* Light text for dark mode */
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 2.5rem; /* Larger font size for headings */
    font-weight: bold;
    text-transform: uppercase; /* Uppercase heading for emphasis */
    letter-spacing: 1px; /* Letter spacing for better readability */
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 20px; /* Consistent spacing between paragraphs */
  }
  
  @media (max-width: 600px) {
    .about-page {
      padding: 20px; /* Reduced padding for smaller screens */
    }
  
    h1 {
      font-size: 2rem; /* Smaller heading size on mobile */
    }
  
    p {
      font-size: 1rem; /* Smaller paragraph size on mobile */
    }
  }
    `}
  
    </style>
    <h1>About Tic Tac Toe</h1>
    <p>
      Tic Tac Toe is a classic game of strategy and fun, where two players take turns marking spaces in a 3x3 grid.
      The goal is simple—align three of your symbols (either 'X' or 'O') vertically, horizontally, or diagonally before your opponent does.
    </p>
    <p>
      The game is easy to learn but challenging to master, making it ideal for all ages! You can play against friends
      or even an AI opponent to test your skills. Tic Tac Toe teaches logical thinking, decision-making, and foresight.
    </p>
  </div>
);

export default About;
