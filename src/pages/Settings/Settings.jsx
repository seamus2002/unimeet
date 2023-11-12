import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="settings-container">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate('/')}>
        Back
      </button>

      <h1>Welcome to the settings page</h1>
    </div>
  );
};

export default Settings;
