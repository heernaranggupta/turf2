import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [viewAllBookingList, setviewAllBookingList] = useState([]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
