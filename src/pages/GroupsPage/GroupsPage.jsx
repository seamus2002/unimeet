import { useContext } from "react";
import AddUserToGroup from "../../components/AddUserToGroup/AddUserToGroup";
import { GroupContext } from "../../contexts/GroupContext";

const GroupsPage = () => {
  const { currentGroup } = useContext(GroupContext);

  return (
    <div>
      {!currentGroup ? (
        <h1>No Group Found</h1>
      ) : (
        <h1>You are in Group: {currentGroup}</h1>
      )}
      <AddUserToGroup />
    </div>
  );
};

export default GroupsPage;
