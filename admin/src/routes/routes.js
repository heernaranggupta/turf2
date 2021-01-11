import React, { useEffect, useContext, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../pages/Home";
import ProtectedRoutes from "./protected.routes";
import Login from "../pages/Login";
import AddManager from "../pages/AddManager";
import { Context } from "../data/context";

const Routes = () => {
  const { setIsLoggedIn, setCompanyName, setRole, setUsername } = useContext(
    Context
  );

  const fetchUserData = useCallback(async () => {
    const data = await localStorage.getItem("turfAdminDetails");
    const newData = await JSON.parse(data);
    if (newData) {
      try {
        setIsLoggedIn(true);
        setCompanyName(newData.businessResponse.companyName);
        setRole(newData.businessResponse.role);
        setUsername(newData.businessResponse.username);
      } catch (error) {
        setIsLoggedIn(false);
        setCompanyName("");
        setRole("");
        setUsername("");
      }
    } else {
      setIsLoggedIn(false);
      setCompanyName("");
      setRole("");
      setUsername("");
    }
  }, [setIsLoggedIn, setCompanyName, setRole, setUsername]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />

        <ProtectedRoutes path="/addManager">
          <AddManager />
        </ProtectedRoutes>

        <Redirect to="/" />
      </Switch>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default Routes;
