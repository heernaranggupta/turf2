import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Context } from "../data/context";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AccountView from "../pages/Account";
import AddManager from "../pages/AddManager";
import AddPrice from "../pages/AddPrice";
import AdjustPrices from "../pages/AdjustPrices";
import Login from "../pages/Auth/Login";
import BookingsViews from "../pages/Bookings";
import DashboardView from "../pages/Dashboard";
import NotFoundView from "../pages/errors/NotFoundView";
import Home from "../pages/Home";
import Managers from "../pages/Managers";
import Products from "../pages/Products";
import Settings from "../pages/Settings";
import ProtectedRoutes from "./protected.routes";

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

        <ProtectedRoutes path="/adjust">
          <DashboardLayout>
            <AdjustPrices />
          </DashboardLayout>
        </ProtectedRoutes>

        <ProtectedRoutes path="/price/add">
          <DashboardLayout>
            <AddPrice />
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
