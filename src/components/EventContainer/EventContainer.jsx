import { useState } from "react";
import { deleteEventsFromFirestore } from "../../utils/firebase/firebase.utils";
import "./EventContainer.css";

const EventContainer = ({ event, displayName, showDelete }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteEvent = (eventId) => {
    deleteEventsFromFirestore(eventId);
    setIsDeleted(true); // Set the isDeleted state to true after deleting the event.
  };

  if (isDeleted) {
    // If the event is deleted, don't render the component.
    return null;
  }

  return (
    <div className="event-container">
      <p className="event-title">
        <strong>
          {displayName} - {event.title}{" "}
          {showDelete ? (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => handleDeleteEvent(event.id)}
            >
              X
            </button>
          ) : null}
        </strong>
      </p>
      <p className="event-datetime">
        {event.start ? new Date(event.start.seconds * 1000).toString() : "N/A"}{" "}
        to {event.end ? new Date(event.end.seconds * 1000).toString() : "N/A"}
      </p>
    </div>
  );
};

export default EventContainer;
