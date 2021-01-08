import React from "react";
import classnames from "classnames";
import { BiRupee } from "react-icons/bi";
import styles from "../css/SlotItems.module.css";
import { tConvert } from "../utils/TimeConverter";

export const SlotCardItem = ({ item, index, handleOnClick, id }) => {
  return (
    <div
      onClick={() => handleOnClick(index, id, item.id, item)}
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
            {tConvert(item.startTime)}
          </p>
          <p style={{ color: item.isSelected ? "white" : "black" }}>
            {tConvert(item.endTime)}
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
