import { useState, useContext } from "react";
import { GroupContext } from "../../contexts/GroupContext";

const AddUserToGroup = () => {
  const { currentGroup, setGroups } = useContext(GroupContext);
  const [email, setEmail] = useState("");

  const addUserToGroup = async () => {
    // Implement Firebase logic to add user to the group
    // Update the groups state using setGroups
  };

  return (
    <div>
      <h2>Add User to Group</h2>
      <input
        type="email"
        placeholder="Enter user's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUserToGroup}>Add User</button>
    </div>
  );
};

export default AddUserToGroup;
