import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import MainSection from "./sections/MainSection";
import SideSection from "./sections/SideSection";
import SignUp from "./Pages/SignUp";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for the landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Other routes */}
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/important" element={<MainSection />} />
        <Route path="/side" element={<SideSection />} />
      </Routes>
    </Router>
  );
}

export default App;

