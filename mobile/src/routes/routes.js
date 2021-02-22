import React, { useContext } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "../pages/home";
import Otp from "../pages/otp";
import Register from "../pages/register";
import PickDate from "../pages/pickDate";
import Bookings from "../pages/bookings";
import Password from "../pages/password";
import Cart from "../pages/cart";
import ProtectedRoutes from "./protected.routes";
import { Context } from "../data/context";
import Success from "../pages/success";
import History from "../pages/history";
import { useMediaQuery } from "react-responsive";

const Routes = () => {
  const { setIsLoggedIn, setToken, setUserData } = useContext(Context);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  if (isDesktopOrLaptop) {
    window.location.href = "http://turf.rebounce.in";
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/otp" component={Otp} />
        <Route path="/password" component={Password} />

        <ProtectedRoutes path="/date">
          <PickDate />
        </ProtectedRoutes>

        <ProtectedRoutes path="/bookings">
          <Bookings />
        </ProtectedRoutes>

        <ProtectedRoutes path="/cart">
          <Cart />
        </ProtectedRoutes>

        <ProtectedRoutes path="/success">
          <Success />
        </ProtectedRoutes>

        <ProtectedRoutes path="/history">
          <History />
        </ProtectedRoutes>

        <Route
          path="/logout"
          exact
          render={() => {
            localStorage.clear();
            setIsLoggedIn(false);
            setToken(null);
            setUserData(null);
            return <Redirect to="/" />;
          }}
        />

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Routes;
