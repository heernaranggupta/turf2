import React from "react";
import classnames from "classnames";
import { Context } from "../data/context";
import styles from "../css/Profile.module.css";
import CartSummary from "../components/CartSummary";

const Checkout = () => {
  return (
    <div className={classnames("section", styles.ProfileWrapper)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <div className={classnames(" columns mt-5")}>
          <div
            className={classnames(
              "column box has-text-centered",
              styles.ProfileLeftColumn
            )}
          >
            <CartSummary />
          </div>
          <div className={classnames("column")}></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
