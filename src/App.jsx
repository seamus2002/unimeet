import { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {/* Default route for the landing page */}
        {currentUser ? (
          <Route exact path="/" element={<HomePage />} />
        ) : (
          <Route exact path="/" element={<LandingPage />} />
        )}

        {/* Other routes */}
        <Route path="/CalendarPage" element={<CalendarPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
