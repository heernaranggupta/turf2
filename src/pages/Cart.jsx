import React from "react";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import CartSummary from "../components/CartSummary";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Cart.module.css";

const Cart = () => {
  return (
    <div className={classnames("section", styles.CartWrapper)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <div className={classnames(" columns mt-5", styles.cartColumns)}>
          <div
            className={classnames(
              "column box has-text-centered",
              styles.cartSummaryWrapper
            )}
          >
            <CartSummary />
          </div>

          <div
            className={classnames(
              "column is-two-thirds ",
              styles.SecondColumns
            )}
          >
            <CartRightSideComponent />
          </div>
        </div>
        <ToastContainer pauseOnHover={false} autoClose={3000} />
      </div>
    </div>
  );
};

export default Cart;
