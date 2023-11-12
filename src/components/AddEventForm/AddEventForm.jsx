import { useContext, useState } from "react";
import moment from "moment";
import "./AddEventForm.css";
import { addEventToFirestore } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/UserContext";

const AddEventForm = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: null,
    end: null,
  });
  const { currentUser } = useContext(UserContext);

  const handleCreateEvent = () => {
    const newId = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
    const newEventToAdd = {
      id: newId.toString(),
      email: currentUser.email,
      ...newEvent,
    };

    // Pass the currentUser.uid to addEventToFirestore
    addEventToFirestore(newEventToAdd);
    setShowEventForm(false);
  };

  return (
    <div className="add-event-form-container">
      <h3>Create Event</h3>
      <input
        className="event-name"
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      />
      <br />
      <div className="description-container">
        <h4 className="starting-time">Start Time:</h4>
        <h4 className="ending-time">End Time:</h4>
      </div>
      <div className = "time-fields">
        <input
          type="datetime-local"
          placeholder="Start Date and Time"
          value={
            newEvent.start
              ? moment(newEvent.start).format("YYYY-MM-DDTHH:mm")
              : ""
          }
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
          value={
            newEvent.end ? moment(newEvent.end).format("YYYY-MM-DDTHH:mm") : ""
          }
          onChange={(e) =>
            setNewEvent({
              ...newEvent,
              end: moment(e.target.value).toDate(),
            })
          }
        />
      </div>
      <br />
      <button onClick={handleCreateEvent} className="left addBtn">
        Add Event
      </button>
    </div>
  );
};

export default AddEventForm;
