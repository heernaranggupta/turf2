import React from "react";
import classnames from "classnames";
import { BiRupee } from "react-icons/bi";
import styles from "../css/SlotItems.module.css";
import { tConvert } from "../utils/TimeConverter";

export const SlotCardItem = ({
  item,
  index,
  handleOnClick,
  id,
  isHistory = false,
}) => {
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
          {isHistory ? (
          <p className={styles.groundName} style={{ color: item.isSelected ? "white" : "black" }}>
            {item.turfId === 'turf01' ? <div>Ground 1</div> : <div></div>}
            {item.turfId === 'turf02' ? <div>Ground 2</div> : <div></div>}
            {item.turfId === 'turf03' ? <div>Ground 3</div> : <div></div>}
          </p>
          ) : (
              ""
            )}
          <p style={{ color: item.isSelected ? "white" : "black" }}>
            {tConvert(item.startTime)}
          </p>
          <p style={{ color: item.isSelected ? "white" : "black" }}>
            {tConvert(item.endTime)}
          </p>
          {isHistory ? (
            <p style={{ color: item.isSelected ? "white" : "black" }}>
              {item.date}
            </p>
          ) : (
              ""
            )}
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
