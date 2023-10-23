import Nametag from "./Nametag";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const UserIcon = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="user-icon">
      <img
        className="user-icon-img"
        src={currentUser.photoURL}
        alt="user-icon"
      />
      <Nametag />
    </div>
  );
};

export default UserIcon;
