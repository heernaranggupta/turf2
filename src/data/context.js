import React, { createContext, useState } from "react";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [name, setName] = useState(null);

  return (
    <context.Provider value={{ name, setName }}>{children}</context.Provider>
  );
};
