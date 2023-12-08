import { useEvents } from "../../contexts/EventsContext";

export default function FindOptimalTime() {
  const { events } = useEvents();

  const startTimes = events.map((event) => (
      event.start ? new Date(event.start).toLocaleTimeString() : "N/A"
  ))

  const endTimes = events.map((event) => (
    event.start ? new Date(event.end).toLocaleTimeString() : "N/A"
))

  return (
    <div>
      {endTimes}
    </div>
  );
}


  {/* {events.map((event) => (
        <p>
          {event.start ? new Date(event.start).toLocaleTimeString() : "N/A"}
        </p>
      ))}{" "} */}