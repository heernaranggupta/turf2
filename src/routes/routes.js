import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Cart from "../pages/Cart";
import Headers from "../components/Headers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedRoutes from "./protected.routes";
import { ToastContainer } from "react-toastify";

const Routes = () => {
  return (
    <Router>
      <Headers />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/login" exact component={Login} />

        <ProtectedRoutes path="/profile">
          <Profile />
        </ProtectedRoutes>

        <Redirect to="/" />
      </Switch>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default Routes;
