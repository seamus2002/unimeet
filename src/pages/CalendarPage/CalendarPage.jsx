import React from "react";
import BigCalendar from "../../components/BigCalendar/BigCalendar";
import { Link } from "react-router-dom";

const CalendarPage = () => {
  return (
    <div>
      <div className="home-button-container">
        <Link to="/" className="home-button">
          Home
        </Link>
      </div>
      <BigCalendar />
    </div>
  );
};

export default CalendarPage;
