import React from "react";
import classnames from "classnames";
import Bookings from "../components/Bookings";
import Headers from "../components/Headers";
import styles from "../css/Home.module.css";

const Home = () => {
  return (
    <div className={classnames("section", styles.addHomeBackground)}>
      <div className="container is-fluid">
        <Headers />
        <Bookings />
      </div>
    </div>
  );
};

export default Home;
