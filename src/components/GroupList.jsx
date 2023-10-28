import { useContext, useEffect, useState } from "react";
import UserIcon from "./UserIcon";
import { UserContext } from "../contexts/UserContext";
import {
  getGroupMemberInfo,
  getGroupMembers,
  getUserGroups,
} from "../utils/firebase/firebase.utils";
import test_user from "../assets/testuser.jpeg";

const GroupList = () => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
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
        const memberInfoPromises = members.map((member) =>
          getGroupMemberInfo(member)
        );
        const memberInfoArray = await Promise.all(memberInfoPromises);

        // Exclude the current user from the memberInfoArray
        const filteredMemberInfoArray = memberInfoArray.filter(
          (info) => info.email !== currentUser.email
        );

        setMemberInfo(filteredMemberInfoArray);
        setMemberInfoFetched(true);
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
