import React, { useCallback, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Context } from "./data/context";
import Routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const {
    token,
    setToken,
    setIsLoggedIn,
    userData,
    setphoneNumber,
    setName,
  } = useContext(Context);
  const checkAuth = useCallback(async () => {
    if (token) {
      var decoded = await jwt_decode(token);
      if (decoded.exp < Date.now() && userData !== null) {
        setIsLoggedIn(true);
        setphoneNumber(userData.phoneNumber);
        setName(userData.name);
        setToken(token);
      } else {
        console.log("here first if");
        setIsLoggedIn(false);
        setToken(null);
      }
    } else {
      console.log("here second if");
      setIsLoggedIn(false);
      setToken(null);
    }
  }, [setIsLoggedIn, token, setToken, userData, setphoneNumber, setName]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes />
      <ToastContainer pauseOnHover={false} autoClose={1500} />
    </Router>
  );
};

export default App;
