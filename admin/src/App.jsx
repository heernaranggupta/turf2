import React, { useCallback, useContext, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import Routes from "./routes/routes";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Context } from "./data/context";

function App() {
  const { setIsLoggedIn, token, userData } = useContext(Context);

  const checkAuth = useCallback(async () => {
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
  }, [setIsLoggedIn, token, userData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
