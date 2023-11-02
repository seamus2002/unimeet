import "./EventContainer.css";

const EventContainer = ({ event }) => {
  return (
    <div className="event-container">
      <p className="event-title">
        <strong>{event.title}</strong>
      </p>
      <p className="event-datetime">
        {event.start ? new Date(event.start.seconds * 1000).toString() : "N/A"}{" "}
        to {event.end ? new Date(event.end.seconds * 1000).toString() : "N/A"}
      </p>
    </div>
  );
};

export default EventContainer;
