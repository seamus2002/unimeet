import { useContext, useEffect, useState } from "react";
import UserIcon from "./UserIcon";
import { UserContext } from "../contexts/UserContext";
import {
  getGroupMemberInfo,
  getGroupMembers,
  getUserGroups,
} from "../utils/firebase/firebase.utils";

const GroupList = () => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberInfo, setMemberInfo] = useState(null);
  const [memberInfoFetched, setMemberInfoFetched] = useState(false);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    const fetchGroupData = async () => {
      const groups = await getUserGroups(currentUser.uid);
      if (groups && groups.length > 0) {
        setCurrentGroup(groups[0]);
      }
    };

    const fetchGroupMembers = async () => {
      if (currentGroup) {
        const groupMembers = await getGroupMembers(currentGroup);
        if (groupMembers && groupMembers.length > 0) {
          setMembers(groupMembers);
        }
      }
    };

    const fetchGroupMemberInfo = async () => {
      if (members.length > 0) {
        const groupMemberInfo = await getGroupMemberInfo(members[0]);
        if (groupMemberInfo) {
          setMemberInfo(groupMemberInfo);
          setMemberInfoFetched(true);
        }
      }
    };

    if (!memberInfoFetched) {
      fetchGroupData()
        .then(() => fetchGroupMembers())
        .then(() => fetchGroupMemberInfo());
    }
  }, [currentUser, currentGroup, members, memberInfoFetched]);

  return (
    <div className="group-list d-flex align-items-center justify-content-center">
      <UserIcon
        photoURL={currentUser.photoURL}
        displayName={currentUser.displayName}
      />
      <pre>{JSON.stringify(memberInfo, null, 2)}</pre>
    </div>
  );
};

export default GroupList;
