import React from "react";
import { BiCart } from "react-icons/bi";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import styles from "../css/Header.module.css";

const Headers = () => {
  const history = useHistory();
  return (
    <div className={classnames(styles.headerWrapper)}>
      <BiCart
        onClick={() => history.push("/cart")}
        size={50}
        color="#FFF"
        className="mx-6 is-clickable"
      />
      <div className={classnames("is-clickable", styles.personCircle)}></div>
    </div>
  );
};

export default Headers;
