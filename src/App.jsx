import React from "react";
import { ContextProvider } from "./data/context";
import Routes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}

export default App;
