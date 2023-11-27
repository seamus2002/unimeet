import { useContext } from "react";
import UserIcon from "../UserIcon/UserIcon";
import { UserContext } from "../../contexts/UserContext";
import test_user from "../../assets/testuser.jpeg";
import "./GroupList.css";
import { GroupContext } from "../../contexts/GroupContext";

const GroupList = () => {
  const { currentUser } = useContext(UserContext);
  const { memberInfo } = useContext(GroupContext);

  return (
    <div className="group-list d-flex align-items-center justify-content-center">
      <UserIcon
        photoURL={currentUser.photoURL ? currentUser.photoURL : test_user}
        displayName={
          currentUser.displayName ? currentUser.displayName : currentUser.email
        }
      />
      {memberInfo.map((info, index) => (
        <UserIcon
          key={index}
          photoURL={info.photoURL ? info.photoURL : test_user}
          displayName={info.displayName ? info.displayName : info.email}
        />
      ))}
    </div>
  );
};

export default GroupList;
