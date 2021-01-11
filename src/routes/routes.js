import React, { useCallback, useContext, useEffect } from "react";
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
import Signup from "../pages/Signup";
import { Context } from "../data/context";
import Checkout from "../pages/Checkout";
import Invoice from "../components/invoice";
import PaymentSuccess from "../pages/PaymentSuccess";

const Routes = () => {
  const { setIsLoggedIn, setCartId, setPhoneNumber } = useContext(Context);

  const checkAuth = useCallback(async () => {
    const data = await localStorage.getItem("turfUserDetails");
    const cartLocalId = localStorage.getItem("turfCart");

    setCartId(() => (cartLocalId ? cartLocalId : null));

    setPhoneNumber(() =>
      data?.user?.phoneNumber ? data.user.phoneNumber : null
    );
    setIsLoggedIn(() => (data !== null ? true : false));
  }, [setIsLoggedIn, setCartId, setPhoneNumber]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <Router>
      <Headers />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/invoice/:id" exact component={Invoice} />

        <ProtectedRoutes path="/profile">
          <Profile />
        </ProtectedRoutes>

        <ProtectedRoutes path="/checkout">
          <Checkout />
        </ProtectedRoutes>

        <ProtectedRoutes path="/payment-success">
          <PaymentSuccess />
        </ProtectedRoutes>

        <Route
          path="/logout"
          exact
          render={() => {
            setIsLoggedIn(false);
            localStorage.removeItem("turfUserDetails");
            localStorage.removeItem("turfCart");
            return <Redirect to="/" />;
          }}
        />

        <Redirect to="/" />
      </Switch>
      <ToastContainer pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default Routes;
