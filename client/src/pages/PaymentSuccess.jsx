import React, { useContext } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Context } from "../data/context";
import PaymentSuccessGIF from "../images/payment-successful.gif";
import styles from "../css/PaymentSuccess.module.css";
import Footer from "../components/footer";

const PaymentSuccess = () => {
  const { setIsLoggedIn } = useContext(Context);
  return (
    <div className={classnames("section", styles.psWrapper)}>
      <div className={classnames("container", styles.psContainer)}>
        <figure className={classnames("image", styles.imageWrapper)}>
          <img src={PaymentSuccessGIF} alt="Payment Successful" />
        </figure>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <p className="subtitle is-2">Enjoy Your Day</p>
          <div>
            <Link to="/book" className="button is-primary">
              Continue Booking
            </Link>
            <Link to="/profile" className="button is-primary mx-3">
              View Profile
            </Link>
            <button
              onClick={async () => {
                await localStorage.removeItem("turfUserDetails");
                setIsLoggedIn(false);
              }}
              className="button is-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
