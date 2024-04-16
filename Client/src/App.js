import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Planner from "./components/Planner"
import Form from "./components/Form"
import BMI from "./components/BMI"
import Recipe from "./components/Recipe"
import Navbar from "./components/Navbar"
import CalorieCounter from "./components/Calorie"
import About from "./components/About"
import Exercise from "./components/Exercise"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>

          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Home/>}/>
          {user && <Route path = "/planner" element={<Planner/>}/>}
          {user && <Route path = "/form" element={<Form/>}/>}
          {user && <Route path = "/bmi" element={<BMI/>}/>}
          {user && <Route path="/recipe" element={<Recipe/>}/>}
          {user && <Route path="/calorie-counter" element={<CalorieCounter/>}/>}
          {user && <Route path = "/about" element={<About/>}/>}
          {user && <Route path = "/exercises" element={<Exercise/>}/>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;