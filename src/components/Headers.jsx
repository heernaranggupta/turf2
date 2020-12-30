import React from "react";
import { BiCart } from "react-icons/bi";
import classnames from "classnames";
import styles from "../css/Header.module.css";

const Headers = () => {
  return (
    <div className={styles.headerWrapper}>
      <BiCart size={50} color="#FFF" className="mx-6 is-clickable" />
      <div className={classnames("is-clickable", styles.personCircle)}></div>
    </div>
  );
};

export default Headers;
