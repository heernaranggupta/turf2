import React, { createContext, useState } from "react";
import { getCurrentTime } from "../utils/getCurrentTime";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState("22:00");

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
