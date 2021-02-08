import React from "react";
import { ContextProvider } from "./data/context";
import Routes from "./routes/routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ContextProvider>
      <Routes />
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </ContextProvider>
  );
}

export default App;
