import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CalendarPage.css"; // Import your custom CSS file
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addEventToFirestore, getEventsFromFirestore } from "../../utils/firebase/firebase.utils";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
  });

  useEffect(() => {
    // Retrieve events from Firestore on component mount
    getEventsFromFirestore().then((events) => {
      setEvents(events);
    });
  }, []);

  const handleCreateEventClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const newEventToAdd = {
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      };

      addEventToFirestore(newEventToAdd)
        .then((docRef) => {
          const eventWithId = { id: docRef.id, ...newEventToAdd };
          setEvents([...events, eventWithId]);
          setNewEvent({ title: "", start: null, end: null });
          setShowEventForm(false);
        })
        .catch((error) => {
          console.error("Error adding event: ", error);
        });
    }
  };

  const handleDeleteEvent = (eventId) => {
    // Remove the event from Firestore and update the state
    deleteEventFromFirestore(eventId)
      .then(() => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
        setSelectedEvent(null);
      })
      .catch((error) => {
        console.error("Error deleting event: ", error);
      });
  }

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
      <div className="home-button-container">
        <Link to="/" className="home-button">
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
}

export default CalendarPage;
