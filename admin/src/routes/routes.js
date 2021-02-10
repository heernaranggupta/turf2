import React, { useContext } from "react";
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
import DashboardView from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import BookingsViews from "../pages/Bookings";
import Settings from "../pages/Settings";
import Products from "../pages/Products";
import NotFoundView from "../pages/errors/NotFoundView";
import MainLayout from "../layouts/MainLayout";
import AccountView from "../pages/Account";
import { Context } from "../data/context";
import AddManager from "../pages/AddManager";
import Managers from "../pages/Managers";

// eslint-disable-next-line no-unused-vars
import Register from "../pages/Auth/Register";

const Routes = () => {
  const { setIsLoggedIn } = useContext(Context);
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
        {/* <Route
          path="/register"
          exact
          render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}
        /> */}

        <ProtectedRoutes path="/account">
          <DashboardLayout>
            <AccountView />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/managers">
          <DashboardLayout>
            <Managers />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/dashboard">
          <DashboardLayout>
            <DashboardView />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/viewBookings">
          <DashboardLayout>
            <BookingsViews />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/addManager">
          <DashboardLayout>
            <AddManager />
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

        <Route
          path="/logout"
          exact
          render={() => {
            setIsLoggedIn(false);
            localStorage.removeItem("turfAdminDetails");
            localStorage.removeItem("turfCart");
            return <Redirect to="/" />;
          }}
        />

        <Redirect to="/404" />
      </Switch>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default Routes;
