import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [ground1Data, setGround1Data] = useState([]);
  const [ground2Data, setGround2Data] = useState([]);
  const [ground3Data, setGround3Data] = useState([]);

  return (
    <Context.Provider
      value={{
        ground1Data,
        setGround1Data,
        ground2Data,
        setGround2Data,
        ground3Data,
        setGround3Data,
      }}
    >
      {children}
    </Context.Provider>
  );
};
