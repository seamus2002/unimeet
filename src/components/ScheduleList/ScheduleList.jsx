import "./ScheduleList.css";
import useGroupData from "../../hooks/useGroupData";

const ScheduleList = () => {
  const { currentGroup } = useGroupData();

  return (
    <div className="schedule-list">
      <div className="bottom">
        <button className="btn btn-success">Add Event</button>
        <button className="btn btn-danger">Delete Event</button>
      </div>
    </div>
  );
};

export default ScheduleList;
