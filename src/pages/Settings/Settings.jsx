import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { UserContext } from "../../contexts/UserContext";
import { updateUser } from "../../utils/firebase/firebase.utils";

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handlePhotoURLChange = (e) => {
    setPhotoURL(e.target.value);
  };

  return (
    <div className="settings-container">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

      <div className="settings-content">
        <h1>User Settings</h1>
        <div className="squiggly-line">
          <svg width="200" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,5 Q20,0 40,5 Q60,10 80,5 Q100,0 120,5 Q140,10 160,5 Q180,0 200,5"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="input-group">
          <div className="input-field one">
            <label htmlFor="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="photoURL">Photo URL:</label>
            <input
              type="text"
              id="photoURL"
              value={photoURL}
              onChange={handlePhotoURLChange}
            />
          </div>
          <button className="saveBtn" onClick={updateUser}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
