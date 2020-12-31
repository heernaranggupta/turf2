import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [groundData, setGroundData] = useState({});
  const [temporaryCart, setTemporaryCart] = useState({
    turf01: [],
    turf02: [],
    turf03: [],
  });

  const [totalTime, setTotalTime] = useState(0);
  const [bookDate, setBookDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [cartId, setCartId] = useState("");
  const [cartData, setCartData] = useState([]);

  return (
    <Context.Provider
      value={{
        groundData,
        setGroundData,
        temporaryCart,
        setTemporaryCart,
        totalTime,
        setTotalTime,
        bookDate,
        setBookDate,
        phoneNumber,
        setPhoneNumber,
        cartId,
        setCartId,
        cartData,
        setCartData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
