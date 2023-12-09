import { DateContext } from "../../contexts/DateContext";
import { useEvents } from "../../contexts/EventsContext";
import { useContext } from "react";

export default function FindOptimalTime() {
  const { events } = useEvents();
  const { currentDate } = useContext(DateContext);
  const date = currentDate.toLocaleDateString();
  let suggestedTimes = "";


  const startTimes = events.map((event) => (
      event.start ? new Date(event.start).toString() : "N/A"
  ))

  const endTimes = events.map((event) => (
    event.start ? new Date(event.end).toString() : "N/A"
))

suggestedTimes = calculateOptimalTime(startTimes, endTimes, date);

  return (
    <div>
        <h5>Optimal Time</h5>
        {suggestedTimes}
    </div>
  );
}

function calculateOptimalTime(startTimes, endTimes, date) {
    // Parse the current date
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // Note: Months are 0-indexed in JavaScript
    const day = currentDate.getDate();
  
    // Convert startTimes and endTimes to Date objects
    const startDates = startTimes.map(time => new Date(time));
    const endDates = endTimes.map(time => new Date(time));
  
    // Identify available slots
    let availableSlots = [];
    
    // Example: Check each hour of the current day for a 3-hour slot
    for (let hour = 9; hour <= 14; hour++) { // 21 because we need 3 hours slot
      const potentialStart = new Date(year, month, day, hour);
      const potentialEnd = new Date(year, month, day, hour + 3);
  
      // Check if this slot overlaps with any existing event
      const isOverlapping = startDates.some((startDate, index) => {
        const endDate = endDates[index];
        return (potentialStart < endDate && potentialEnd > startDate);
      });
  
      if (!isOverlapping) {
        availableSlots.push({ start: potentialStart, end: potentialEnd });
      }
    }
  
    // Select the optimal slot from availableSlots
    // For now, let's just take the earliest available slot
    if (availableSlots.length > 0) {
      const optimalSlot = availableSlots[0]; // Or use other criteria to select
      return `Optimal Time: ${optimalSlot.start.toLocaleTimeString()} - ${optimalSlot.end.toLocaleTimeString()}`;
    } else {
      return "No available slot for this day.";
    }
  }
  












  {/* {events.map((event) => (
        <p>
          {event.start ? new Date(event.start).toLocaleTimeString() : "N/A"}
        </p>
      ))}{" "} */}