import React, { useState, useEffect, useCallback, useContext } from "react";
import classnames from "classnames";
import axios from "axios";
import { BiCalendarWeek } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import styles from "../css/Bookings.module.css";
import GroundImage from "../images/ground.png";
import GroundImageSelected from "../images/ground_selected.png";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { Context } from "../data/context";
import SlotItems from "./SlotItems";
import {
  convertMinsToHrsMins,
  getMaxAllowedMonth,
} from "../utils/TimeConverter";
import headerWithToken from "../config/headerWithToken";
import { Link } from "react-router-dom";

const Bookings = () => {
  const {
    setGroundData,
    temporaryCart,
    setTemporaryCart,
    totalTime,
    bookDate,
    setBookDate,
    phoneNumber,
    cartId,
    setCartId,
  } = useContext(Context);

  const [isGroundSelected1, setIsGroundSelected1] = useState(true);
  const [isGroundSelected2, setIsGroundSelected2] = useState(false);
  const [isGroundSelected3, setIsGroundSelected3] = useState(false);
  const [maxAllowedDate, setMaxAllowedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleOnSave = () => {
    const slots = [];
    if (isGroundSelected1) {
      slots.push(...temporaryCart.turf01);
    }
    if (isGroundSelected2) {
      slots.push(...temporaryCart.turf02);
    }
    if (isGroundSelected3) {
      slots.push(...temporaryCart.turf03);
    }

    const body = {
      cartId: cartId.length ? cartId : "",
      userPhoneNumber: phoneNumber === 0 ? "" : phoneNumber,
      selectedSlots: [...slots],
    };

    const url = api + "user/cart";
    axios
      .post(url, body, headerWithToken)
      .then((res) => {
        console.log(res.data);
        if (res.data.body.phoneNumber === undefined || null) {
          localStorage.setItem("turfCart", res.data.body._cartId);
          setCartId(res.data.body._cartId);
        }

        if (res.data.success === true) {
          toast.success("Added SuccessFully to Cart");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };

  const markSelectedCard = useCallback(
    (groundDataNew) => {
      const tempTurf01 = temporaryCart.turf01;
      const tempTurf02 = temporaryCart.turf02;
      const tempTurf03 = temporaryCart.turf03;

      if (groundDataNew.turf01) {
        groundDataNew.turf01.forEach((item) => {
          item.id = `${item.startTime}_g1`;

          tempTurf01.forEach((item2) => {
            if (item.id === item2.id) {
              item.isSelected = true;
            }
          });
        });
      }
      if (groundDataNew.turf02) {
        groundDataNew.turf02.forEach((item) => {
          item.id = `${item.startTime}_g2`;
          tempTurf02.forEach((item2) => {
            if (item.id === item2.id) {
              item.isSelected = true;
            }
          });
        });
      }
      if (groundDataNew.turf03) {
        groundDataNew.turf03.forEach((item) => {
          item.id = `${item.startTime}_g3`;
          tempTurf03.forEach((item2) => {
            if (item.id === item2.id) {
              item.isSelected = true;
            }
          });
        });
      }

      console.log(groundDataNew);

      setGroundData(groundDataNew);
    },
    [
      temporaryCart.turf01,
      temporaryCart.turf02,
      temporaryCart.turf03,
      setGroundData,
    ]
  );

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

        markSelectedCard(responseData);
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
    markSelectedCard,
  ]);

  useEffect(() => {
    getMaxAllowedMonth(setMaxAllowedDate);
    getAllUserData();
    console.log(temporaryCart);
  }, [getAllUserData, temporaryCart]);

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
            "column box is-two-thirds",
            styles.addMinHeight,
            styles.addBookingBackground
          )}
        >
          <div className={classnames(styles.timeBarWrapper)}>
            <div style={{ display: "flex" }} className={styles.dateWrapper}>
              <BiCalendarWeek size={40} color="#FFF" className="mx-3" />
              <div className="control has-icons-right">
                <input
                  className="input"
                  type="date"
                  placeholder="Pick Date"
                  value={bookDate}
                  min={new Date().toISOString().slice(0, 10)}
                  max={maxAllowedDate}
                  onChange={(event) => {
                    if (
                      temporaryCart.turf01.length ||
                      temporaryCart.turf02.length ||
                      temporaryCart.turf03.length
                    ) {
                      if (
                        window.confirm(
                          "All changes will be lost when date is changed. Do you want to continue?"
                        )
                      ) {
                        setTemporaryCart({
                          turf01: [],
                          turf02: [],
                          turf03: [],
                        });
                        setBookDate(event.target.value);
                      }
                    } else {
                      setBookDate(event.target.value);
                    }
                  }}
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
            <SlotItems />
          </div>
          <div className={classnames(styles.checkoutWrapper, "my-3")}>
            <div className={styles.timeBarWrapper}>
              <div style={{ display: "flex" }} className={styles.dateWrapper}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Total Hours"
                      readOnly
                      value={convertMinsToHrsMins(totalTime)}
                    />
                  </div>
                </div>
              </div>
              <button
                className="button is-primary is-light"
                onClick={() => handleOnSave()}
              >
                Save Changes
              </button>
              <Link
                to="/cart"
                onClick={() => handleOnSave()}
                className="button is-success is-light my-3"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bookings;
