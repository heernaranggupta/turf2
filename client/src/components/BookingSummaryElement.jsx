import React from "react";
import classnames from "classnames";
import { BiRupee, BiFile } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { tConvert, convertDate } from "../utils/TimeConverter";
import { useHistory } from "react-router-dom";
import styles from "../css/BookingSummaryElement.module.css";

const BookingSummaryElement = ({
  item,
  index,
  handleOnClick,
  handleOnClickView,
  id,
  isHistory = false,
}) => {
  const history = useHistory();
  return (
    <div
      //   onClick={() => handleOnClick(index, id, item.id, item)}
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
          <p
            className={styles.groundName}
            style={{ color: item.isSelected ? "white" : "black" }}
          >
            {item.turfId === "turf01" ? "Ground 1" : <span></span>}
            {item.turfId === "turf02" ? "Ground 2" : <span></span>}
            {item.turfId === "turf03" ? "Ground 3" : <span></span>}
          </p>

          <p
            style={{ color: item.isSelected ? "white" : "black" }}
            className="my-1"
          >
            {convertDate(item.date)}
          </p>

          <p style={{ color: item.isSelected ? "white" : "black" }}>
            {tConvert(item.startTime)}
          </p>
          <p style={{ color: item.isSelected ? "white" : "black" }}>
            {tConvert(item.endTime)}
          </p>
        </div>

        <div className={styles.currencyWrapper}>
          <p className={(styles.slotPriceWrapper, "title is-4 mb-0")}>
            <span>
              <BiRupee size={20} color={"#000"} />
            </span>
            <span>{item.price}</span>
          </p>
          <div className={styles.action}>
            <span onClick={() => handleOnClick(index, id, item.id, item)}>
              <MdDelete size={30} color={"#fff"} />
            </span>
            <span>
              <BiFile
                size={30}
                color={"#fff"}
                onClick={() => history.push(`/invoice/${item.orderId}`)}
              />
            </span>
          </div>
        </div>
        {/* <div className={styles.currencyWrapper}>
          <p className={(styles.slotPriceWrapper, "title is-4")}>
            <span onClick={() => handleOnClick(index, id, item.id, item)}>
              <MdDelete size={20} color={"#000"} />
            </span>
            <span></span>
          </p>
        </div>
        <div className={styles.currencyWrapper}>
          <p className={(styles.slotPriceWrapper, "title is-4")}>
            <span onClick={() => handleOnClickView(index, id, item.id, item)}>
              <BiFile size={20} color={"#000"} />
            </span>
            <span></span>
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default BookingSummaryElement;
