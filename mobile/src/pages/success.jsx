import React from "react";
import classnames from "classnames";
import SuccessGif from "../images/success.gif";
import styles from "../css/success.module.css";
import NextButton from "../components/NextButton";
import { useHistory } from "react-router-dom";

const Success = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className={classnames("columns")}>
        <div className={classnames("column", styles.FirstColumn)}>
          <div className={classnames(styles.LandingImage)}>
            <img src={SuccessGif} alt="Success" />
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <p className="subtitle is-2">Payment Successful</p>
          <p className="subtitle">Your Slots has been booked</p>

          <NextButton
            title="Go Home"
            onClickHandler={() => history.push("/home")}
          />
        </div>
      </div>
    </div>
  );
};

export default Success;
