import React from "react";
import classnames from "classnames";
import PaymentSuccessGIF from "../images/payment-successful.gif";
import styles from "../css/PaymentSuccess.module.css";

const PaymentSuccess = () => {
  return (
    <div className={classnames("section", styles.psWrapper)}>
      <div className={classnames("container", styles.psContainer)}>
        <figure className={classnames("image", styles.imageWrapper)}>
          <img src={PaymentSuccessGIF} alt="Payment Successful" />
        </figure>
      </div>
    </div>
  );
};

export default PaymentSuccess;
