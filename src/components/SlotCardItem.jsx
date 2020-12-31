import React from "react";
import classnames from "classnames";
import "moment-timezone";
import { BiRupee } from "react-icons/bi";
import Moment from "react-moment";
import styles from "../css/SlotItems.module.css";

export const SlotCardItem = ({ item, index, handleOnClick, id }) => {
  return (
    <div
      onClick={() => handleOnClick(index, id, item.id)}
      className={classnames("card is-clickable", styles.cardItem)}
      key={index}
    >
      <div className={classnames(styles.cardItemContent)}>
        <div
          className={classnames(
            styles.slotTimeWrapper,
            item.isSelected && styles.cardClicked
          )}
        >
          <p style={{ color: item.isSelected ? "white" : "black" }}>
            <Moment subtract={{ hours: 12 }} format="hh:mm A">
              {item.startTime}
            </Moment>
          </p>
          <p style={{ color: item.isSelected ? "white" : "black" }}>
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
      </div>
    </div>
  );
};
