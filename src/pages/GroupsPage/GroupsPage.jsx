import { useContext } from "react";
import AddUserToGroup from "../../components/AddUserToGroup/AddUserToGroup";
import { GroupContext } from "../../contexts/GroupContext";

const GroupsPage = () => {
  const { currentGroup } = useContext(GroupContext);

  return (
    <div>
      {!currentGroup ? (
        <>
          <h1>No Group Found</h1>
          <AddUserToGroup />
        </>
      ) : (
        <h1>You are in Group: {currentGroup}</h1>
      )}
    </div>
  );
};

export default GroupsPage;
