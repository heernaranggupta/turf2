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
import Login from "../pages/Auth/Login";
import ViewAllBookings from "../pages/ViewAllBookings";
import AddManager from "../pages/AddManager";
import { Context } from "../data/context";
import DashboardView from "../pages/Reports";
import DashboardLayout from "../layouts/DashboardLayout";
import CustomerListView from "../pages/Customers";
import Account from "../pages/Account";
import Settings from "../pages/Settings";
import Products from "../pages/Products";
import NotFoundView from "../pages/errors/NotFoundView";
import MainLayout from "../layouts/MainLayout";

const Routes = () => {
  const {
    setIsLoggedIn,
    setCompanyName,
    setRole,
    setUsername,
    setphoneNumber,
  } = useContext(Context);

  const fetchUserData = useCallback(async () => {
    const data = await localStorage.getItem("turfAdminDetails");
    const newData = await JSON.parse(data);
    if (newData) {
      try {
        setIsLoggedIn(true);
        setCompanyName(newData.businessResponse.companyName);
        setRole(newData.businessResponse.role);
        setUsername(newData.businessResponse.username);
        setphoneNumber(newData.businessResponse.phoneNumber);
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
  }, [setIsLoggedIn, setCompanyName, setRole, setUsername, setphoneNumber]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          exact
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />

        <ProtectedRoutes path="/addManager">
          <AddManager />
        </ProtectedRoutes>

        <ProtectedRoutes path="/viewBookings">
          <ViewAllBookings />
        </ProtectedRoutes>

        <ProtectedRoutes path="/dashboard">
          <DashboardLayout>
            <DashboardView />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/customers">
          <DashboardLayout>
            <CustomerListView />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/account">
          <DashboardLayout>
            <Account />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/settings">
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/products">
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        </ProtectedRoutes>

        <Route
          path="/404"
          exact
          render={() => (
            <MainLayout>
              <NotFoundView />
            </MainLayout>
          )}
        />

        <Redirect to="/404" />
      </Switch>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default Routes;
