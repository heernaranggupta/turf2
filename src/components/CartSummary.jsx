import React, { useContext } from "react";
import classnames from "classnames";
import styles from "../css/Cart.module.css";
import { BiRupee } from "react-icons/bi";
import { Context } from "../data/context";

const CartSummary = () => {
  const { totalAmount, totalSlots } = useContext(Context);
  return (
    <>
      <p className={classnames("subtitle is-1 is-capitalized has-text-white")}>
        cart
      </p>

      <div className={classnames(styles.cartSummaryInfo)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            className={classnames(
              "subtitle is-3 is-capitalized has-text-white"
            )}
          >
            Total Amount
          </p>
          <p
            className={classnames(
              "subtitle is-3 is-capitalized has-text-white"
            )}
          >
            {totalAmount}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            className={classnames(
              "subtitle is-3 is-capitalized has-text-white"
            )}
          >
            Total Slots
          </p>
          <p
            className={classnames(
              "subtitle is-3 is-capitalized has-text-white"
            )}
          >
            {totalSlots}
          </p>
        </div>
      </div>

      <div className={classnames(styles.cartTotalInfo)}>
        <BiRupee size={40} color="#FFF" />
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Total Amount"
              readOnly
              value={totalAmount}
            />
          </div>
        </div>
      </div>

      <button
        className={classnames(
          "button is-large has-text-white",
          styles.checkoutBtn
        )}
      >
        CHECKOUT
      </button>
    </>
  );
};

export default CartSummary;
