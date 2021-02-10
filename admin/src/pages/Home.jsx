import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../data/context";

const Home = () => {
  const { isLoggedIn } = useContext(Context);

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Home;
