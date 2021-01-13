import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [viewAllBookingList, setviewAllBookingList] = useState([]);
  const [toDate, setToDate] = useState(new Date().toISOString().slice(0, 10));
  const [fromDate, setFromDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState("BOOKED_BY_USER");

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        companyName,
        setCompanyName,
        role,
        setRole,
        username,
        setUsername,
        phoneNumber,
        setphoneNumber,
        viewAllBookingList,
        setviewAllBookingList,
        toDate,
        setToDate,
        fromDate,
        setFromDate,
        status,
        setStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};
