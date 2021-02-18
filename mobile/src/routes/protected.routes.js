import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../data/context";

const ProtectedRoutes = ({ children, ...rest }) => {
  const { token, isLoggedIn } = useContext(Context);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return token || isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/register",
              state: {
                from: location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoutes;
