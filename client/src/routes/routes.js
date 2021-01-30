import React, { useCallback, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./protected.routes";
import Cart from "../pages/Cart";
import Headers from "../components/Headers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import { Context } from "../data/context";
import PrintInvoice from "../Invoice/PrintInvoice";

const Routes = () => {
  const { setIsLoggedIn, setCartId, setPhoneNumber, setUserData } = useContext(
    Context
  );

  const checkAuth = useCallback(async () => {
    const data = await localStorage.getItem("turfUserDetails");
    const cartLocalId = localStorage.getItem("turfCart");

    setCartId(() => (cartLocalId ? cartLocalId : null));

    setUserData(data.user);

    setPhoneNumber(() =>
      data?.user?.phoneNumber ? data.user.phoneNumber : null
    );
    setIsLoggedIn(() => (data !== null ? true : false));
  }, [setIsLoggedIn, setCartId, setPhoneNumber, setUserData]);

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
        <Route path="/invoice/:id" exact component={PrintInvoice} />

        {/* <Route
          path="/pdf"
          exact
          render={() => {
            return (
              <div>
                <PDFViewer
                  height={window.innerHeight}
                  width={window.innerWidth}
                >
                  <InvoiceGenerator invoice={invoiceData} />
                </PDFViewer>
              </div>
            );
          }}
        />

        <Route
          path="/try"
          exact
          render={() => {
            return (
              <PDFDownloadLink
                document={<InvoiceGenerator invoice={invoiceData} />}
                fileName="somename.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download now!"
                }
              </PDFDownloadLink>
            );
          }}
        /> */}

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
            localStorage.clear();
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
