import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Settings.css";
import { UserContext } from "../../contexts/UserContext";
import { updateUser } from "../../utils/firebase/firebase.utils";

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState(currentUser.displayName || "");
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL || "");

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

      <div>
        <h2>User Settings</h2>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={handleDisplayNameChange}
          />
        </div>
        <div>
          <label htmlFor="photoURL">Photo URL:</label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={handlePhotoURLChange}
          />
        </div>
        <button className="btn btn-primary" onClick={updateUser}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
