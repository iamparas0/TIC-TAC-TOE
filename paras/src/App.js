import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./Game"
import Signup from "./Signup"
import Login from "./Login"
import Chatbot from './components/Chatbot/Chatbot';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Game/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    <Chatbot />
    </>
  );
}

export default App;
