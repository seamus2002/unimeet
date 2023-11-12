import { useState, createContext } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const addOneDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const subtractOneDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const changeToSpecificDay = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <DateContext.Provider
      value={{ currentDate, addOneDay, subtractOneDay, changeToSpecificDay }}
    >
      {children}
    </DateContext.Provider>
  );
};
