import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignUp from "./Pages/SignUp";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import CalendarPage from "./Pages/CalendarPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Other routes */}
        <Route path="/CalendarPage" element={<CalendarPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
