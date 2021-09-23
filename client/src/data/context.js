import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groundData, setGroundData] = useState({});
  const [sortedData, setSortedData] = useState({});
  const [totalTime, setTotalTime] = useState(0);
  const [bookDate, setBookDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [cartId, setCartId] = useState(localStorage.getItem("turfCart") || "");
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [priceSplit, setPriceSplit] = useState({
    payNow: 0,
    payAtSite: 0,
  });
  const [totalSlots, setTotalSlots] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("turfUserDetails")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

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
        cartId,
        setCartId,
        cartData,
        setCartData,
        totalAmount,
        setTotalAmount,
        priceSplit,
        setPriceSplit,
        totalSlots,
        setTotalSlots,
        isCartEmpty,
        setIsCartEmpty,
        userData,
        setUserData,
        isLoading,
        setIsLoading,
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};
