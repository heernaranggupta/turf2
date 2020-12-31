import React from "react";
import { ContextProvider } from "./data/context";
import Routes from "./routes/routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Headers from "./components/Headers";

function App() {
  return (
    <ContextProvider>
      <Headers />
      <Routes />
    </ContextProvider>
  );
}

export default App;
