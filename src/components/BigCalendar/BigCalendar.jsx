import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  addEventToFirestore,
  deleteEventsFromFirestore,
  getEventsFromFirestore,
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

const BigCalendar = ({ memberInfo }) => {
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
  useEffect(() => {
    // Fetch events from Firestore when the component mounts
    async function fetchEvents() {
      const eventsData = await getEventsFromFirestore();

      // Convert Firestore timestamps to JavaScript dates
      const convertedEvents = eventsData.flatMap((event) =>
        memberInfo.map((member) =>
          event.email === currentUser.email || event.email === member.email
            ? {
                ...event,
                start: event.start.toDate(),
                end: event.end.toDate(),
              }
            : null
        )
      );

      setEvents(convertedEvents.filter((event) => event !== null));
      console.log(convertedEvents);
      console.log("Member Info: " + memberInfo);
    }

    fetchEvents();
  }, [currentUser, memberInfo]);

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
        onClick={() =>
          event.email === currentUser.email && setSelectedEvent(event)
        }
      >
        {children}
      </div>
    );
  }

  return (
    <div className="calendar-page">
      {selectedEvent ? (
        <div className="event-cancel-modal">
          <p>Are you sure you want to cancel this event?</p>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteEvent(selectedEvent.id)}
          >
            Cancel Event
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedEvent(null)}
          >
            Never Mind
          </button>
        </div>
      ) : (
        <div className="event-form">
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
          <button className="btn btn-primary" onClick={handleCreateEvent}>
            Save Event
          </button>
        </div>
      )}

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
          style={{ height: "60vh" }}
        />
      </DndProvider>
    </div>
  );
};

export default BigCalendar;
