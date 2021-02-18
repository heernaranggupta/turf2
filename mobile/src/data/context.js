import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        phoneNumber,
        setphoneNumber,
        name,
        setName,
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
