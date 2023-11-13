import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./BigCalendar.css"; // Import your custom CSS file
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  addEventToFirestore,
  deleteEventsFromFirestore,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/UserContext";

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "Meeting with Client",
    start: new Date(2023, 10, 15, 10, 0),
    end: new Date(2023, 10, 15, 12, 0),
  },
  {
    id: 2,
    title: "Team Meeting",
    start: new Date(2023, 10, 16, 14, 0),
    end: new Date(2023, 10, 16, 15, 30),
  },
  // Add more events here
];

const BigCalendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
  });

  const handleCreateEventClick = (date) => {
    setSelectedDate(date);

    // Toggle showEventForm to open/close the event form
    setShowEventForm(!showEventForm);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const newId = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
      const newEventToAdd = {
        id: newId.toString(),
        email: currentUser.email,
        ...newEvent,
      };

      // Pass the currentUser.uid to addEventToFirestore
      addEventToFirestore(newEventToAdd);

      setEvents([...events, newEventToAdd]);
      setShowEventForm(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    setSelectedEvent(null);
    deleteEventsFromFirestore(eventId);
  };

  function CustomEvent({ event, children }) {
    const [, ref] = useDrag({
      type: "EVENT",
      item: { id: event.id },
    });

    const [, drop] = useDrop({
      accept: "EVENT",
      drop: (item) => {
        // Handle the drop action here, e.g., updating the event's start and end dates
        console.log("Dropped event with ID:", item.id);
      },
    });

    return (
      <div
        ref={(node) => ref(drop(node))}
        className={`custom-event ${
          selectedEvent && selectedEvent.id === event.id ? "selected" : ""
        }`}
        onClick={() => setSelectedEvent(event)}
      >
        {children}
      </div>
    );
  }

  return (
    <div className="calendar-page">
      {showEventForm && (
        <div className="event-form">
          <h2>Create Event</h2>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <input
            type="datetime-local"
            placeholder="Start Date and Time"
            value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                start: moment(e.target.value).toDate(),
              })
            }
          />
          <input
            type="datetime-local"
            placeholder="End Date and Time"
            value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) =>
              setNewEvent({ ...newEvent, end: moment(e.target.value).toDate() })
            }
          />
          <button onClick={handleCreateEvent}>Save Event</button>
        </div>
      )}
      <button
        onClick={() => handleCreateEventClick(selectedDate)}
        className="calendar-button"
      >
        <i className="fa fa-calendar"></i>{" "}
        {/* Assuming you are using Font Awesome for the calendar icon */}
        <span>Create Event</span>
      </button>
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
          className="custom-calendar"
        />
      </DndProvider>
      {selectedEvent && (
        <div className="event-cancel-modal">
          <p>Are you sure you want to cancel this event?</p>
          <button onClick={() => handleDeleteEvent(selectedEvent.id)}>
            Cancel Event
          </button>
          <button onClick={() => setSelectedEvent(null)}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
