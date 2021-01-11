import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
