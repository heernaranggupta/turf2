import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "../data/context";

const ProtectedRoutes = ({ children, ...rest }) => {
  const { isLoggedIn } = useContext(Context);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
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
