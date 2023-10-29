import "./ScheduleList.css";

const ScheduleList = () => {
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
