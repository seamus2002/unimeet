import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateContext } from "../../contexts/DateContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { currentDate } = useContext(DateContext);

  return (
    <div className="main-header d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-1">
            {/* Settings Button */}
            <div className="rotate">
              <i
                onClick={() => navigate("/Settings")}
                className="bi bi-gear-wide-connected pointer"
              ></i>
            </div>
          </div>

          {/* Date Panel */}
          <div className="col-sm-10 date-panel">
            <div>{currentDate.toLocaleDateString()}</div>
          </div>

          <div className="col-sm-1">
            {/* Calendar Button */}
            <i
              onClick={() => navigate("/CalendarPage")}
              className="bi bi-calendar pointer"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
