import firebase from 'firebase/app'; // Import 'firebase/app'
import 'firebase/firestore';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CalendarPage.css"; // Import your custom CSS file
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const localizer = momentLocalizer(moment);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIZELBdvncmPHlUduOE030P9zjDK7fZxs",
  authDomain: "unimeet-db.firebaseapp.com",
  projectId: "unimeet-db",
  storageBucket: "unimeet-db.appspot.com",
  messagingSenderId: "107988111323",
  appId: "1:107988111323:web:31a05627bc811c297221fe"
};

// Initialize Firebase with your configuration
const firebaseApp = firebase.initializeApp(firebaseConfig);


// Initialize Firestore
const db = firebase.firestore();

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
    const userId = 'user.uid'; // Get the user's ID after authentication
    const eventsRef = db.collection(`users/${userId}/events`);
    
    const unsubscribe = eventsRef.onSnapshot((querySnapshot) => {
      const eventsArray = [];
      querySnapshot.forEach((doc) => {
        eventsArray.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsArray);
    });

    return unsubscribe;
  }, []);

  const handleCreateEventClick = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const userId = 'user.uid'; // Get the user's ID after authentication
      db.collection(`users/${userId}/events`)
        .add(newEvent)
        .then(() => {
          console.log("Event added to Firestore");
        })
        .catch((error) => {
          console.error("Error adding event: ", error);
        });

      setShowEventForm(false);
    }
  };

  const handleDeleteEvent = (eventId) => {
    const userId = 'user.uid'; // Get the user's ID after authentication
    db.collection(`users/${userId}/events`)
      .doc(eventId)
      .delete()
      .then(() => {
        console.log("Event deleted from Firestore");
      })
      .catch((error) => {
        console.error("Error deleting event: ", error);
      });

    setSelectedEvent(null);
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
