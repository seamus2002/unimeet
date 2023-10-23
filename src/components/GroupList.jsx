import { useContext, useEffect, useState } from "react";
import UserIcon from "./UserIcon";
import { UserContext } from "../contexts/UserContext";
import { getUserGroups } from "../utils/firebase/firebase.utils";

const GroupList = () => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    const fetchGroupData = async () => {
      const groups = await getUserGroups(currentUser.uid);

      if (groups && groups.length > 0) {
        setCurrentGroup(groups[0]);
      }
    };

    fetchGroupData();
  }, []);

  return (
    <div className="group-list d-flex align-items-center justify-content-center">
      <UserIcon />
      <p>Current Group: {currentGroup}</p>
    </div>
  );
};

export default GroupList;
