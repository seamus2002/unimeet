import { useContext } from "react";
import AddUserToGroup from "../../components/AddUserToGroup/AddUserToGroup";
import { GroupContext } from "../../contexts/GroupContext";
import { useNavigate } from "react-router-dom";

const GroupsPage = () => {
  const { currentGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  return (
    <div>
      {/* Back button */}
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>

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
