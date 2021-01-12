import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { ContextProvider } from "./data/context";
import Routes from "./routes/routes";
import theme from "./theme";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
