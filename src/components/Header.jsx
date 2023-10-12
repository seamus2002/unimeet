import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-sm-1">
            <i className="bi bi-three-dots-vertical"></i>
          </div>

          {/* Date Panel */}
          <div className="col-sm-10 date-panel">
            <div className="row">
              <div className="col-sm-1">
                <i className="bi bi-caret-left-fill"></i>
              </div>
              <div className="col-sm-10">
                Date
              </div>
              <div className="col-sm-1">
                <i className="bi bi-caret-right-fill"></i>
              </div>
            </div>
          </div>

          <div className="col-sm-1">
            {/* CALENDAR BUTTON */}
            <Link to="/CalendarPage">
              <i className="bi bi-calendar"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
