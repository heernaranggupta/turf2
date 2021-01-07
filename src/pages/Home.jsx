import React from "react";
import classnames from "classnames";
import Bookings from "../components/Bookings";
import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={classnames(styles.addHomeBackground)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <Bookings />
      </div>
    </div>
  );
};

export default Home;
