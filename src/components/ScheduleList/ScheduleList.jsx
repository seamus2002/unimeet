import "./ScheduleList.css";
import useGroupData from "../../hooks/useGroupData";
import { getEventsFromFirestore } from "../../utils/firebase/firebase.utils";
import { useEffect, useState } from "react";

const ScheduleList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from Firestore when the component mounts
    async function fetchEvents() {
      const eventsData = await getEventsFromFirestore();
      setEvents(eventsData);
    }

    fetchEvents();
  }, []);

  return (
    <div className="schedule-list">
      <div className="event-list">
        <h2>Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong> -{" "}
              {event.start
                ? new Date(event.start.seconds * 1000).toString()
                : "N/A"}{" "}
              to{" "}
              {event.end
                ? new Date(event.end.seconds * 1000).toString()
                : "N/A"}
            </li>
          ))}
        </ul>
      </div>
      <div className="bottom">
        <button className="btn btn-success">Add Event</button>
        <button className="btn btn-danger">Delete Event</button>
      </div>
    </div>
  );
};

export default ScheduleList;
