import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "../pages/home";
import Otp from "../pages/otp";
import Register from "../pages/register";
import PickDate from "../pages/pickDate";
import Bookings from "../pages/bookings";
import Password from "../pages/password";
import ProtectedRoutes from "./protected.routes";

const Routes = () => {
  return (
    <Router>
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

        <Route
          path="/logout"
          exact
          render={() => {
            console.log("Clearing from routes");
            localStorage.clear();
            return <Redirect to="/" />;
          }}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
