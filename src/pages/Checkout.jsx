import React, { useContext } from "react";
import classnames from "classnames";
import { Context } from "../data/context";
import styles from "../css/Checkout.module.css";
import CartSummary from "../components/CartSummary";
import CartRightSideComponent from "../components/CartRightSideComponent";
import PaymentGateway from "../components/PaymentGateway";
import { ListData } from "../utils/ListData";

const Checkout = () => {
  const { cartData } = useContext(Context);
  const allData = ListData(cartData);

  return (
    <div className={classnames("section", styles.CheckoutWrapper)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <div className={classnames("columns mt-5")}>
          <div
            className={classnames(
              "column box has-text-centered",
              styles.CheckoutLeftColumn
            )}
          >
            <CartSummary />
            <CartRightSideComponent />
          </div>
          <div className={classnames("column", styles.CheckoutRightColumn)}>
            <PaymentGateway />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
