import { useState, createContext } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ currentDate }}>
      {children}
    </DateContext.Provider>
  );
};
