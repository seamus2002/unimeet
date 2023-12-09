import { DateContext } from "../../contexts/DateContext";
import { useEvents } from "../../contexts/EventsContext";

export default function FindOptimalTime() {
  const { events } = useEvents();
  const { currentDate } = useContext(DateContext);

  const startTimes = events.map((event) => (
      event.start ? new Date(event.start).toString() : "N/A"
  ))

  const endTimes = events.map((event) => (
    event.start ? new Date(event.end).toString() : "N/A"
))

  return (
    <div>
      {events.map((event) => (
        <p>
          {event.start ? new Date(event.start).toString() : "N/A"}
        </p>
      ))}{" "}
    </div>
  );
}


  {/* {events.map((event) => (
        <p>
          {event.start ? new Date(event.start).toLocaleTimeString() : "N/A"}
        </p>
      ))}{" "} */}