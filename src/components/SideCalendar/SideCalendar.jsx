import { useContext, useState } from "react";
import Calendar from "react-calendar";
import { DateContext } from "../../contexts/DateContext";
import "react-calendar/dist/Calendar.css";

const SideCalendar = () => {
  const { currentDate, changeToSpecificDay } = useContext(DateContext);
  const [date, setDate] = useState(currentDate);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    changeToSpecificDay(newDate);
  };

  return <Calendar onChange={handleDateChange} value={date} />;
};

export default SideCalendar;
