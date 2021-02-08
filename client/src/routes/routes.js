import React, { useCallback, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ProtectedRoutes from "./protected.routes";
import Cart from "../pages/Cart";
import Headers from "../components/Headers";
import Bookings from "../pages/Bookings";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import { Context } from "../data/context";
import PrintInvoice from "../Invoice/PrintInvoice";
import Home from "../pages/Home";

const Routes = () => {
  const {
    setIsLoggedIn,
    setCartId,
    setUserData,
    setIsLoading,
    setToken,
  } = useContext(Context);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    var data = await localStorage.getItem("turfUserDetails");
    var token = await localStorage.getItem("token");
    const cartLocalId = localStorage.getItem("turfCart");

    data = JSON.parse(data);

    if (token) {
      var decoded = await jwt_decode(token);
      if (decoded.exp > Date.now()) {
        setToken(token);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        setToken(null);
        localStorage.clear();
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
      setToken(null);
      localStorage.clear();
    }

    if (data !== null) {
      setIsLoggedIn(true);
      setUserData(data);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
      setToken(null);
      localStorage.clear();
    }

    setCartId(() => (cartLocalId ? cartLocalId : null));
    setIsLoading(false);
  }, [setIsLoggedIn, setCartId, setUserData, setIsLoading, setToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <Router>
      <Headers />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/book" component={Bookings} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/invoice/:id" component={PrintInvoice} />

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
            console.log("Clearing from routes");
            localStorage.clear();
            setIsLoggedIn(false);
            setUserData(null);
            return <Redirect to="/" />;
          }}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
