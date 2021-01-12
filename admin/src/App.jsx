import React from "react";
import { ContextProvider } from "./data/context";
import Routes from "./routes/routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}

export default App;
