import React from "react";
import classnames from "classnames";
import { BiRupee } from "react-icons/bi";
import ReactTooltip from "react-tooltip";
import styles from "../css/SlotItems.module.css";
import { tConvert, convertDate } from "../utils/TimeConverter";

export const SlotCardItem = ({
  item,
  index,
  handleOnClick,
  id,
  isHistory = false,
  isDisabled = false,
}) => {
  return (
    <div
      onClick={() => handleOnClick(index, id, item.id, item)}
      className={classnames(
        "card is-clickable",
        styles.cardItem,
        isDisabled && styles.disabled
      )}
      data-tip={isDisabled ? "Not Available" : "Add To Cart"}
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
            <p
              className={styles.groundName}
              style={{ color: item.isSelected ? "white" : "black" }}
            >
              {item.turfId === "turf01" ? "Ground 1" : <span></span>}
              {item.turfId === "turf02" ? "Ground 2" : <span></span>}
              {item.turfId === "turf03" ? "Ground 3" : <span></span>}
            </p>
          ) : (
            ""
          )}
          {isHistory ? (
            <p
              style={{ color: item.isSelected ? "white" : "black" }}
              className="my-1"
            >
              {convertDate(item.date)}
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
        </div>

        <div className={styles.currencyWrapper}>
          <p className={(styles.slotPriceWrapper, "title is-4")}>
            <span>
              <BiRupee size={20} color={"#000"} />
            </span>
            <span>{item.price}</span>
          </p>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};
