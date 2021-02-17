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
import SelectTurf from "../pages/selectTurf";
import PickDate from "../pages/pickDate";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/otp" component={Otp} />
        <Route path="/turf" component={SelectTurf} />
        <Route path="/date" component={PickDate} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
