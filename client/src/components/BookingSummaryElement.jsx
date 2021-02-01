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
  id,
  isHistory = false,
}) => {
  const history = useHistory();
  return (
    <div className={classnames("card", styles.cardItem)} key={index}>
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

          {!isHistory && (
            <div className={classnames("is-clickable", styles.action)}>
              <span onClick={() => handleOnClick(index, id, item.id, item)}>
                <MdDelete size={30} color={"#FFF"} />
              </span>
            </div>
          )}
        </div>
      </div>

      <footer className="card-footer">
        <span
          className="card-footer-item is-clickable"
          onClick={() => history.push(`/invoice/${item.orderId}`)}
        >
          <BiFile
            size={30}
            onClick={() => history.push(`/invoice/${item.orderId}`)}
          />
          Download Invoice
        </span>
      </footer>
    </div>
  );
};
export default BookingSummaryElement;
