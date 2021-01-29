import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groundData, setGroundData] = useState({});
  const [sortedData, setSortedData] = useState({});
  const [totalTime, setTotalTime] = useState(0);
  const [bookDate, setBookDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [userData, setUserData] = useState(null);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        sortedData,
        setSortedData,
        groundData,
        setGroundData,
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
        totalAmount,
        setTotalAmount,
        totalSlots,
        setTotalSlots,
        isCartEmpty,
        setIsCartEmpty,
        userData,
        setUserData
      }}
    >
      {children}
    </Context.Provider>
  );
};
