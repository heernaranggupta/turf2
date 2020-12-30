import React, { useState, useEffect, useCallback, useContext } from "react";
import classnames from "classnames";
import axios from "axios";
import { BiCalendarWeek } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import styles from "../css/Bookings.module.css";
import dividerStyles from "../css/divider.module.css";
import GroundImage from "../images/ground.png";
import GroundImageSelected from "../images/ground_selected.png";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { Context } from "../data/context";
import SlotItems from "./SlotItems";

const Bookings = () => {
  const {
    ground1Data,
    setGround1Data,
    ground2Data,
    setGround2Data,
    ground3Data,
    setGround3Data,
  } = useContext(Context);

  const [isGroundSelected1, setIsGroundSelected1] = useState(true);
  const [isGroundSelected2, setIsGroundSelected2] = useState(false);
  const [isGroundSelected3, setIsGroundSelected3] = useState(false);

  const [bookDate, setBookDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [maxAllowedDate, setMaxAllowedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const getMaxAllowedMonth = () => {
    const date = new Date();
    const newDate = new Date(date.setMonth(date.getMonth() + 1));
    setMaxAllowedDate(newDate.toISOString().slice(0, 10));
  };

  const getAllUserData = useCallback(() => {
    console.log("Get All User Function Called");
    const groundList = [];
    if (isGroundSelected1) {
      groundList.push("turf01");
    }
    if (isGroundSelected2) {
      groundList.push("turf02");
    }
    if (isGroundSelected3) {
      groundList.push("turf03");
    }
    const postData = {
      turfIds: [...groundList],
      date: bookDate,
      openTime: "2020-12-24T08:00:00.000Z",
      closeTime: "2020-12-24T16:00:10.000Z",
      slotDuration: 30,
    };

    axios
      .post(api + "user/get-all-slots-by-date", postData, headerWithoutToken)
      .then((res) => {
        const responseData = res.data.body;
        if (responseData.turf01 !== null && responseData.turf01.length) {
          setGround1Data([...responseData.turf01]);
        }
        if (responseData.turf02 !== null && responseData.turf02.length) {
          setGround2Data([...responseData.turf02]);
        }
        if (responseData.turf03 !== null && responseData.turf03.length) {
          setGround3Data([...responseData.turf03]);
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  }, [
    isGroundSelected1,
    isGroundSelected2,
    isGroundSelected3,
    bookDate,
    setGround1Data,
    setGround2Data,
    setGround3Data,
  ]);

  useEffect(() => {
    getMaxAllowedMonth();
    getAllUserData();
  }, [getAllUserData]);

  return (
    <div className={classnames()}>
      <div className={classnames("columns", styles.columnsWrapper)}>
        <div className={classnames("column box", styles.addGroundBackground)}>
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
                <input
                  className="input"
                  type="date"
                  placeholder="Pick Date"
                  value={bookDate}
                  min={new Date().toISOString().slice(0, 10)}
                  max={maxAllowedDate}
                  onChange={(event) => setBookDate(event.target.value)}
                />
                <span className="icon is-small is-right">
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
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </div>
              <div className="control">
                <input
                  className="input ml-3"
                  type="time"
                  placeholder="Pick End Time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={classnames(styles.slotsWrapper)}>
            <SlotItems title="Ground 1" data={ground1Data} />
            <SlotItems title="Ground 2" data={ground2Data} />
            <SlotItems title="Ground 3" data={ground3Data} />
          </div>
          <div className={classnames(styles.checkoutWrapper)}></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bookings;
