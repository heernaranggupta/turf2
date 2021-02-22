import React, { useContext } from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";
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
import { useMediaQuery } from "react-responsive";

const Routes = () => {
  const { setIsLoggedIn, setUserData, setToken } = useContext(Context);

  const loc = useLocation();

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });

  if (!loc.pathname.includes("/invoice/")) {
    if (isTabletOrMobileDevice) {
      window.location.href = "http://m.turf.rebounce.in";
    }
  }
  return (
    <>
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
            setToken(null);
            return <Redirect to="/" />;
          }}
        />

        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default Routes;
