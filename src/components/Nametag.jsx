import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Nametag = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="nametag-container">
      <div className="nametag">
        {currentUser.displayName.split(" ").slice(0, -1).join(" ")}
      </div>
    </div>
  );
};

export default Nametag;
