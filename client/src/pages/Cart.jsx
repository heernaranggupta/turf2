import React, { useContext } from "react";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import CartSummary from "../components/CartSummary";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Cart.module.css";
import PaymentGateway from "../components/PaymentGateway";
import { Context } from "../data/context";
import { Redirect } from "react-router-dom";

const Cart = () => {
  const { isLoggedIn, userData, isLoading } = useContext(Context);

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  if (!isLoggedIn || userData === null) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: "/cart",
          },
        }}
      />
    );
  }
  return (
    <>
      <div className={classnames(styles.addRelationalBackground)}></div>
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
              <PaymentGateway />
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
    </>
  );
};

export default Cart;
