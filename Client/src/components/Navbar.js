import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  const user = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // Check if the user is on the home page
  const isHomePage = location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login";

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">OnlyFIT</Link>
        </div>
        <div className="nav-links">
          <Link to="/bmi">BMI Calculator</Link>
          <Link to="/recipe">Nutrition</Link>
          <Link to="/calorie-counter">Calorie Tracker</Link>
          <Link to="/exercises">Exercises</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/about">About Us</Link>

          {user ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      {/* Display the message only if the user is not logged in and not on the home page */}
      {!user && !isHomePage && <h1 style={{ color: 'white', textAlign: 'center' }}>Please log in to access the content.</h1>}
    </>
  );
};

export default Navbar;
