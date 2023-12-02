import { useState, useContext } from "react";
import { GroupContext } from "../../contexts/GroupContext";
import { addUserToGroup } from "../../utils/firebase/firebase.utils";

const AddUserToGroup = () => {
  const { currentGroup, setGroups } = useContext(GroupContext);
  const [email, setEmail] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (email && currentGroup) {
      await addUserToGroup(email, currentGroup);
      setEmail(""); // Clear the input field after adding the user
    }
  };

  return (
    <div>
      <h2>Add User to Group</h2>
      <form onSubmit={handleAddUser}>
        <label>
          User Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserToGroup;
