import React, { useContext} from "react";
import { useEvents } from "../../contexts/EventsContext";

export default function FindOptimalTime() {
    const { events } = useEvents();
    

    

    return (
        <div>{events.map(event => <p>{event.start
            ? new Date(event.start.seconds * 1000).toLocaleTimeString()
            : "N/A"}</p>)} </div>
    )
}