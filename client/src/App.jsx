import React, { useCallback, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import Routes from "./routes/routes";
import { Context } from "./data/context";
import Loading from "./components/Loading";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const {
    isLoading,
    setIsLoggedIn,
    setIsLoading,
    token,
    userData,
  } = useContext(Context);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    if (token) {
      var decoded = await jwt_decode(token);
      if (decoded.exp < Date.now() && userData !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [setIsLoggedIn, setIsLoading, token, userData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Routes />
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </>
  );
};

export default App;
