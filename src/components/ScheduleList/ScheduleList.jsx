import "./ScheduleList.css";
import { getEventsFromFirestore } from "../../utils/firebase/firebase.utils";
import { useContext, useEffect, useState } from "react";
import EventContainer from "../EventContainer/EventContainer"; // Import the EventContainer component
import { UserContext } from "../../contexts/UserContext";

const ScheduleList = () => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useContext(UserContext);

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
          {events.map((event, index) =>
            event.uid === currentUser.uid ? (
              <EventContainer
                key={index}
                event={event}
                displayName={currentUser.displayName}
              />
            ) : (
              console.log(event.uid)
            )
          )}
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
