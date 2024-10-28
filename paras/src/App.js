import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./Game"
import Signup from "./Signup"
import Login from "./Login"
import About from "./components/about"
import Contact from "./components/contact";
import Rules from "./components/rules";
import navBar from "./components/navBar";
function App() {
  return (
    <div>
      <navBar />
      <Router>
      <Routes>
        <Route path="/" element={<Game/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Rules" element={<Rules/>} />
        
        <Route path="/login" element={<Login/>} />
       
      </Routes>
    </Router>
    </div>
  );
}

export default App;
