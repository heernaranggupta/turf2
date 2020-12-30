import React, { useState } from "react";
import classnames from "classnames";
import { BiCalendarWeek } from "react-icons/bi";
import styles from "../css/Bookings.module.css";
import dividerStyles from "../css/divider.module.css";
import GroundImage from "../images/ground.png";
import GroundImageSelected from "../images/ground_selected.png";

const Bookings = () => {
  const [isGroundSelected1, setIsGroundSelected1] = useState(true);
  const [isGroundSelected2, setIsGroundSelected2] = useState(false);
  const [isGroundSelected3, setIsGroundSelected3] = useState(false);

  return (
    <div className={classnames()}>
      <div className="columns">
        <div
          className={classnames(
            "column box",
            styles.addMinHeight,
            styles.addGroundBackground
          )}
        >
          <figure
            className="image"
            onClick={() => {
              setIsGroundSelected1(!isGroundSelected1);
            }}
          >
            {isGroundSelected1 ? (
              <img
                src={GroundImageSelected}
                alt="Ground 1"
                className={styles.GroundImage}
              />
            ) : (
              <img
                src={GroundImage}
                alt="Ground 1"
                className={styles.GroundImage}
              />
            )}
          </figure>

          <figure
            className="image"
            onClick={() => {
              setIsGroundSelected2(!isGroundSelected2);
            }}
          >
            {isGroundSelected2 ? (
              <img
                src={GroundImageSelected}
                alt="Ground 2"
                className={styles.GroundImage}
              />
            ) : (
              <img
                src={GroundImage}
                alt="Ground 2"
                className={styles.GroundImage}
              />
            )}
          </figure>

          <figure
            className="image"
            onClick={() => {
              setIsGroundSelected3(!isGroundSelected3);
            }}
          >
            {isGroundSelected3 ? (
              <img
                src={GroundImageSelected}
                alt="Ground 3"
                className={styles.GroundImage}
              />
            ) : (
              <img
                src={GroundImage}
                alt="Ground 3"
                className={styles.GroundImage}
              />
            )}
          </figure>
        </div>

        <div
          className={classnames(
            dividerStyles.divider,
            dividerStyles.isVertical
          )}
        ></div>

        <div
          className={classnames(
            "column box is-three-fifths",
            styles.addMinHeight,
            styles.addBookingBackground
          )}
        >
          <div className={classnames(styles.timeBarWrapper)}>
            <div style={{ display: "flex" }}>
              <BiCalendarWeek size={40} color="#FFF" className="mx-3" />
              <div className="control has-icons-right">
                <input className="input" type="date" placeholder="Pick Date" />
                <span class="icon is-small is-right">
                  <BiCalendarWeek color="#000" />
                </span>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <BiCalendarWeek size={40} color="#FFF" className="mx-3" />
              <div className="control">
                <input
                  className="input "
                  type="time"
                  placeholder="Pick Start Time"
                />
              </div>
              <div className="control">
                <input
                  className="input ml-3"
                  type="time"
                  placeholder="Pick End Time"
                />
              </div>
            </div>
          </div>
          <div className={classnames(styles.slotsWrapper)}></div>
          <div className={classnames(styles.checkoutWrapper)}></div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
