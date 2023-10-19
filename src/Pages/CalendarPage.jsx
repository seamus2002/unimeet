import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CalendarPage.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import CSS for styling
import moment from 'moment';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const localizer = momentLocalizer(moment);

// Define an initial list of events
const initialEvents = [
  {
    id: 1,
    title: 'Meeting with Client',
    start: new Date(2023, 10, 15, 10, 0),
    end: new Date(2023, 10, 15, 12, 0),
  },
  {
    id: 2,
    title: 'Team Meeting',
    start: new Date(2023, 10, 16, 14, 0),
    end: new Date(2023, 10, 16, 15, 30),
  },
  // Add more events here
];

function CalendarPage() {
  const [events, setEvents] = useState(initialEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track selected event for cancellation
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: null,
    end: null,
  });

  const handleCreateEventClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const newId = Math.max(...events.map((event) => event.id)) + 1;
      setEvents([...events, { id: newId, ...newEvent }]);
      setShowEventForm(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    setSelectedEvent(null); // Deselect the event after deletion
  };

  // Define a custom event component with class names and drag-and-drop behavior
  function CustomEvent({ event, children }) {
    const [, ref] = useDrag({
      type: 'EVENT',
      item: { id: event.id },
    });

    const [, drop] = useDrop({
      accept: 'EVENT',
      drop: (item) => {
        // Handle the drop action here, e.g., updating the event's start and end dates
        console.log('Dropped event with ID:', item.id);
      },
    });

    return (
      <div
        ref={(node) => ref(drop(node))}
        className={`custom-event ${selectedEvent && selectedEvent.id === event.id ? 'selected' : ''}`}
        onClick={() => setSelectedEvent(event)}
      >
        {children}
      </div>
    );
  }

  return (
    <div>
      <div className="home-button-container">
        <Link exact to="/" className="home-button">
          Home
        </Link>
      </div>
      {showEventForm && (
        <div className="event-form">
          <h2>Create Event</h2>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="Start Date and Time"
            value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setNewEvent({ ...newEvent, start: moment(e.target.value).toDate() })}
          />
          <input
            type="datetime-local"
            placeholder="End Date and Time"
            value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
            onChange={(e) => setNewEvent({ ...newEvent, end: moment(e.target.value).toDate() })}
          />
          <button onClick={handleCreateEvent}>Save Event</button>
        </div>
      )}
      <button onClick={() => handleCreateEventClick(selectedDate)}>Create Event</button>
      <DndProvider backend={HTML5Backend}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(slotInfo) => setSelectedDate(slotInfo.start)}
          components={{
            eventWrapper: CustomEvent,
          }}
        />
      </DndProvider>
      {selectedEvent && (
        <div className="event-cancel-modal">
          <p>Are you sure you want to cancel this event?</p>
          <button onClick={() => handleDeleteEvent(selectedEvent.id)}>Cancel</button>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
