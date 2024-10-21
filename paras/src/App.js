import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./Game"
import Signup from "./Signup"
import Login from "./Login"
import Rules from './Rules';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/rules.js" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;
