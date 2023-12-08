import { useEvents } from "../../contexts/EventsContext";

export default function FindOptimalTime() {
  const { events } = useEvents();

  return (
    <div>
      {events.map((event) => (
        <p>
          {event.start ? new Date(event.start).toLocaleTimeString() : "N/A"}
        </p>
      ))}{" "}
    </div>
  );
}
