import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import { DateProvider } from "./contexts/DateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <DateProvider>
        <App />
      </DateProvider>
    </UserProvider>
  </React.StrictMode>
);
