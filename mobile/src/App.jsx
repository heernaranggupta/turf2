import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./routes/routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes />
      <ToastContainer pauseOnHover={false} autoClose={1500} />
    </>
  );
};

export default App;
