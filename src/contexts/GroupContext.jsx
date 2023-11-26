import { createContext, useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  getUserGroups,
  getGroupMembers,
  getGroupMemberInfo,
} from "../utils/firebase/firebase.utils";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberInfo, setMemberInfo] = useState([]);
  const [memberInfoFetched, setMemberInfoFetched] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      const userGroups = await getUserGroups(currentUser.uid);
      if (userGroups && userGroups.length > 0) {
        setGroups(userGroups);
        setCurrentGroup(userGroups[0]);
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

  const value = {
    groups,
    setGroups,
    currentGroup,
    setCurrentGroup,
    members,
    memberInfo,
    memberInfoFetched,
  };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};

export { GroupProvider, GroupContext };
