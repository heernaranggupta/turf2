import React, { createContext, useState } from "react";
import { getMinMonth } from "../utils/dates";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("turfAdminDetails")) || null
  );
  const [viewAllBookingList, setviewAllBookingList] = useState([]);
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [fromDate, setFromDate] = useState(getMinMonth());
  const [status, setStatus] = useState("BOOKED_BY_USER");

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userData,
        setUserData,
        viewAllBookingList,
        setviewAllBookingList,
        toDate,
        setToDate,
        fromDate,
        setFromDate,
        status,
        setStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
};
