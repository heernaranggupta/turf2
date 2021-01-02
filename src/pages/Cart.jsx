import React, { useContext } from "react";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import { Context } from "../data/context";
import { Link } from "react-router-dom";
import CartSummary from "../components/CartSummary";
import CartRightSideComponent from "../components/CartRightSideComponent";
import styles from "../css/Cart.module.css";

const Cart = () => {
  const { isCartEmpty } = useContext(Context);

  if (isCartEmpty) {
    return (
      <div className={classnames("container", styles.isCartEmptyWrapper)}>
        <article className="message is-success is-large">
          <div className="message-header">
            <p>Message</p>
          </div>
          <div className="message-body">Your Cart is Empty</div>
          <Link to="/" className="button is-success m-5">
            Book Slots
          </Link>
        </article>
      </div>
    );
  }

  return (
    <div className={classnames("section", styles.CartWrapper)}>
      <div className={classnames("container")}>
        <div className={classnames(" columns mt-5", styles.cartContainer)}>
          <div
            className={classnames(
              "column box has-text-centered",
              styles.cartSummaryWrapper
            )}
          >
            <CartSummary />
          </div>

          <div className={classnames("column is-two-thirds")}>
            <CartRightSideComponent />
          </div>
        </div>
        <ToastContainer pauseOnHover={false} autoClose={3000} />
      </div>
    </div>
  );
};

export default Cart;
