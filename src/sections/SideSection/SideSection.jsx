import "./SideSection.css";
import logo from "../../assets/logo.png";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import SideCalendar from "../../components/SideCalendar/SideCalendar";
import { useEvents } from "../../contexts/EventsContext";
import FindOptimalTime from "../../components/OptimalEventTime/FindOptimalTime";

const SideSection = () => {
  const { events } = useEvents();

  return (
    <div className="side-section">
      <span className="side-header">
        UniMeet <img src={logo} alt="logo" style={{ width: "50px" }} />
      </span>
      <hr />
      <p>Welcome to UniMeet!</p>
      <ul>
        <li>Add your scheduled events</li>
        <li>View your friends' events</li>
        <li>Plan a time to meet up</li>
      </ul>
      <SideCalendar />
      <br />
      <button onClick={signOutUser} className="btn btn-primary">
        <i className="bi bi-box-arrow-left" /> Sign Out
      </button>
      <FindOptimalTime />
      {/* <ul className="nav-list">
        <li className="nav-item">
          <label htmlFor="groups">Group: </label>
          <select name="groups" id="groups" className="group-select">
            <option value="group1">group1</option>
            <option value="group2">group2</option>
            <option value="group3">group3</option>
            <option value="group4">group4</option>
          </select>
        </li>
        <li className="nav-item">Calendar</li>
        <li className="nav-item">
        <a className="nav-link" onClick={signOutUser}>
            Sign Out
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default SideSection;
