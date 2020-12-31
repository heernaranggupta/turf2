import React from "react";
import classnames from "classnames";
import "moment-timezone";
import Moment from "react-moment";
import { BiRupee } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import styles from "../css/CartElement.module.css";

const CartElement = ({ data, label }) => {
  return (
    <div className={classnames(styles.groundWrapper, "has-text-centered")}>
      <p className="title has-text-centered">{label}</p>
      <div className={styles.scrollGroundItems}>
        {data.map((item, index) => {
          return (
            <div
              className={classnames("box", styles.groundItemWrapper)}
              key={index}
            >
              <div className={styles.timeDurationWrapper}>
                <p>
                  <Moment subtract={{ hours: 12 }} format="hh:mm A">
                    {item.startTime}
                  </Moment>
                </p>
                <p>
                  <Moment subtract={{ hours: 12 }} format="hh:mm A">
                    {item.endTime}
                  </Moment>
                </p>
              </div>

              <div className={styles.currencyWrapper}>
                <p className={(styles.slotPriceWrapper, "title is-4")}>
                  <span>
                    <BiRupee size={30} color={"#000"} />
                  </span>
                  <span>{item.price}</span>
                </p>
              </div>

              <span
                className={classnames(styles.deleteWrapper, "is-clickable")}
              >
                <MdDelete color="#FFF" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartElement;
