import "./ScheduleList.css";
import { getEventsFromFirestore } from "../../utils/firebase/firebase.utils";
import { useContext, useEffect, useState } from "react";
import EventContainer from "../EventContainer/EventContainer"; // Import the EventContainer component
import { UserContext } from "../../contexts/UserContext";
import { DateContext } from "../../contexts/DateContext";

const ScheduleList = ({ memberInfo }) => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { currentDate } = useContext(DateContext);

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
        <h3>Events</h3>
        <ul>
          {events.map((event, index) =>
            event.email === currentUser.email ? (
              event.start && event.end ? (
                currentDate.toLocaleDateString() ===
                new Date(event.start.seconds * 1000).toLocaleDateString() ? (
                  <EventContainer
                    key={index}
                    event={event}
                    displayName={currentUser.displayName}
                    showDelete={true}
                  />
                ) : null
              ) : null
            ) : null
          )}
          {memberInfo.map((member, index) =>
            events.map((event, eventIndex) =>
              event.email === member.email ? (
                event.start && event.end ? (
                  currentDate.toLocaleDateString() ===
                  new Date(event.start.seconds * 1000).toLocaleDateString() ? (
                    <EventContainer
                      key={eventIndex}
                      event={event}
                      displayName={member.displayName}
                    />
                  ) : null
                ) : null
              ) : null
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleList;
