import Nametag from "../Nametag/Nametag";
import "./UserIcon.css";

const UserIcon = ({ photoURL, displayName }) => {
  return (
    <div className="p-2">
      <div className="user-icon">
        <img className="user-icon-img" src={photoURL} alt="user-icon" />
        <Nametag displayName={displayName} />
      </div>
    </div>
  );
};

export default UserIcon;
