import React from 'react';
import './Home.css';
import { useNavigate, Link } from "react-router-dom"


const Home = () => {
  const user = localStorage.getItem("token");
  
  return (
    <>
    <div className="index-page">
      <div className="content">
        <h1>Welcome to Our Fitness Tracking Website</h1>
        <p style={{color: '#f57418'}}>Track your fitness journey and achieve your goals with us.</p>
        {user ? (
          <></>
        ) : (
          <Link className= "get-started-button" to="/signup">Get Started</Link>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;