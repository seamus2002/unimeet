import { Link } from "react-router-dom";
import { useState } from 'react';
import '../styles/LandingPage.css';

const Landing = () => {
  return (
    <div>
      <h1>THIS IS THE LANDING PAGE</h1>
      <Link to="/home" className="buttons">
        Continue to Site (Temporary)
      </Link>
      <br /> {/* Add a line break */}
      <Link to="/login" className="buttons">
        LOGIN
      </Link>
      <br /> {/* Add a line break */}
      <Link to="/sign-up" className="buttons">
        SIGN UP
      </Link>
    </div>
  );
};

export default Landing;
