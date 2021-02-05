import React from "react";
import classnames from "classnames";
import Bookings from "../components/Bookings";
import styles from "../css/BookingPage.module.css";
import LandingPage from "../components/LandingPage";

const Home = () => {
  return (
    <div className={classnames(styles.addHomeBackground)}>
      <div
        className={classnames("container is-fluid", styles.overRideContainer)}
      >
        <LandingPage />
        <Bookings />
      </div>
    </div>
  );
};

export default Home;
