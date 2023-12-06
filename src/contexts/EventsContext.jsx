import { createContext, useContext, useEffect, useState } from "react";
import { getEventsFromFirestore } from "../utils/firebase/firebase.utils";
import { UserContext } from "./UserContext";
import { GroupContext } from "./GroupContext";

const EventsContext = createContext();

export const useEvents = () => {
  return useContext(EventsContext);
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { memberInfo } = useContext(GroupContext);

  useEffect(() => {
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

  const value = {
    events,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};
