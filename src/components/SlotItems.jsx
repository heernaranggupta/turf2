import React from "react";
import classnames from "classnames";
import { BiRupee } from "react-icons/bi";
import styles from "../css/SlotItems.module.css";

const SlotItems = ({ title, data }) => {
  return (
    <div>
      <div className={classnames(styles.slotHeaderWrapper)}>
        <p className="subtitle is-3 is-uppercase has-text-white">Slots</p>
        <div className={classnames(styles.addHorizontalBar)}></div>
        <p
          className={classnames(
            "subtitle is-3 is-uppercase has-text-white",
            styles.slotTitle
          )}
        >
          {title}
        </p>
      </div>

      <div className={classnames(styles.slotContentWrapper)}>
        {data.map((item, index) => {
          return (
            <div
              className={classnames("card is-clickable", styles.cardItem)}
              key={index}
            >
              <div
                className={classnames("card-content", styles.cardItemContent)}
              >
                <div className="columns">
                  <div className={classnames("column", styles.slotTimeWrapper)}>
                    <p>{item.startTime}</p>
                    <p>{item.endTime}</p>
                  </div>
                  <div className="column">
                    <p className={(styles.slotPriceWrapper, "title is-4")}>
                      <span>
                        <BiRupee size={30} />
                      </span>
                      <span>{item.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlotItems;
