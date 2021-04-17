import React from "react";
import classnames from "classnames";
import styles from "../css/about.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={classnames(styles.aboutfooter)}>
        <div className={classnames(styles.pol)}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/term">Terms & conditions</Link>
          <Link to="/refund">Cancellation/Refund Policy</Link>
        </div>
        
        <div className={classnames(styles.powerby)}>
          Powered by Smarty Pants Technologies
        </div>
      </div>
    </>
  );
};

export default Footer;
