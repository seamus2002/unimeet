// useGroupData.js
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  getUserGroups,
  getGroupMembers,
  getGroupMemberInfo,
} from "../utils/firebase/firebase.utils";

const useGroupData = () => {
  const { currentUser } = useContext(UserContext);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
  const [memberInfoFetched, setMemberInfoFetched] = useState(false);

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

  return {
    currentGroup,
    members,
    memberInfo,
    memberInfoFetched,
  };
};

export default useGroupData;
