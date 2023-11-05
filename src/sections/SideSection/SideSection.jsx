import "./SideSection.css";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const SideSection = () => {
  return (
    <div className="side-section">
      <span className="side-header">UniMeet</span>
      <hr />
      <ul className="nav-list">
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
      </ul>
    </div>
  );
};

export default SideSection;
