import { Link } from "react-router-dom";
import { signOutUser } from "../utils/firebase/firebase.utils";

const Header = () => {
  const date = new Date();

  return (
    <div className="main-header d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-1">
            <i className="bi bi-three-dots-vertical" onClick={signOutUser}></i>
          </div>

          {/* Date Panel */}
          <div className="col-sm-10 date-panel">
            <div className="row">
              <div className="col-sm-1">
                <i class="bi bi-caret-left-fill"></i>
              </div>
              <div className="col-sm-10">{date.toLocaleDateString()}</div>
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
  );
};

export default Header;
