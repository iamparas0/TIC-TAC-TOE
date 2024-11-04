// Sparkle.js
import React from 'react';
import './Sparkle.css';

const Sparkle = ({ x, y }) => {
  return (
    <div className="sparkle" style={{ left: x, top: y }} />
  );
};

export default Sparkle;
