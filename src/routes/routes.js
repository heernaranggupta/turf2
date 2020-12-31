import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Cart from "../components/Cart";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
