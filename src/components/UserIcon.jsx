import Nametag from "./Nametag";

const UserIcon = ({ photoURL, displayName }) => {
  return (
    <div className="user-icon">
      <img className="user-icon-img" src={photoURL} alt="user-icon" />
      <Nametag displayName={displayName} />
    </div>
  );
};

export default UserIcon;
