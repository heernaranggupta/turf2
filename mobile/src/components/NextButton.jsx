import React from "react";
import classnames from "classnames";
import { BsArrowRight } from "react-icons/bs";
import styles from "../css/nextButton.module.css";

const NextButton = ({ title, onClickHandler }) => {
  return (
    <div className={classnames(styles.buttonWrapper)}>
      <div
        className={classnames(styles.button)}
        onClick={() => onClickHandler()}
      >
        <p className="has-text-white is-size-5">{title}</p>
        <BsArrowRight size={30} className="has-text-white is-size-5" />
      </div>
    </div>
  );
};

export default NextButton;
