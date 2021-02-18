import React, { useState, useEffect, useCallback, useContext } from "react";
import classnames from "classnames";
import axios from "axios";
import { BiCalendarWeek, BiTime } from "react-icons/bi";
import { toast } from "react-toastify";
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
import { Link } from "react-router-dom";
import { filterData } from "../utils/filterData";
import { compareTime } from "../utils/compareTime";
import Loading from "./Loading";

const Bookings = () => {
  const {
    isLoading,
    setSortedData,
    setGroundData,
    setTotalTime,
    totalTime,
    bookDate,
    setBookDate,
    setCartId,
    setCartData,
    setTotalSlots,
    token,
  } = useContext(Context);

  const [isGroundSelected1, setIsGroundSelected1] = useState(true);
  const [isGroundSelected2, setIsGroundSelected2] = useState(true);
  const [isGroundSelected3, setIsGroundSelected3] = useState(true);
  const [maxAllowedDate, setMaxAllowedDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("22:00");

  const handleFetchedData = useCallback(
    (res, FetchgroundData) => {
      if (res.status === 200) {
        setTotalSlots(res.data?.body?.selectedSlots.length || 0);
        const [sortedData] = filterData(res.data.body);
        setCartData(sortedData);
        const selectedDateCart = sortedData[bookDate];
        const newData = FetchgroundData;

        if (selectedDateCart) {
          if (selectedDateCart.turf01 && newData.turf01) {
            selectedDateCart.turf01.forEach((item) => {
              newData.turf01.forEach((item2) => {
                if (
                  `${item.startTime}_g1_${item.date}` ===
                  `${item2.startTime}_g1_${item2.date}`
                ) {
                  item2.isSelected = true;
                  setTotalTime((old) => old + 30);
                }
              });
            });
          }

          if (selectedDateCart.turf02 && newData.turf02) {
            selectedDateCart.turf02.forEach((item) => {
              newData.turf02.forEach((item2) => {
                if (
                  `${item.startTime}_g2_${item.date}` ===
                  `${item2.startTime}_g2_${item2.date}`
                ) {
                  item2.isSelected = true;
                  setTotalTime((old) => old + 30);
                }
              });
            });
          }

          if (selectedDateCart.turf03 && newData.turf03) {
            selectedDateCart.turf03.forEach((item) => {
              newData.turf03.forEach((item2) => {
                if (
                  `${item.startTime}_g3_${item.date}` ===
                  `${item2.startTime}_g3_${item2.date}`
                ) {
                  item2.isSelected = true;
                  setTotalTime((old) => old + 30);
                }
              });
            });
          }
        }
        const newFilterData = {
          turf01: [],
          turf02: [],
          turf03: [],
        };

        if (newData.turf01) {
          newData.turf01.forEach((item) => {
            if (!compareTime(startTime, item.startTime)) {
              if (!compareTime(item.startTime, endTime)) {
                newFilterData.turf01.push(item);
              }
            }
          });
        }
        if (newData.turf02) {
          newData.turf02.forEach((item) => {
            if (!compareTime(startTime, item.startTime)) {
              if (!compareTime(item.startTime, endTime)) {
                newFilterData.turf02.push(item);
              }
            }
          });
        }
        if (newData.turf03) {
          newData.turf03.forEach((item) => {
            if (!compareTime(startTime, item.startTime)) {
              if (!compareTime(item.startTime, endTime)) {
                newFilterData.turf03.push(item);
              }
            }
          });
        }

        setSortedData({ ...newData });

        setGroundData({ ...newFilterData });
      }
    },
    [
      setCartData,
      bookDate,
      setGroundData,
      setSortedData,
      setTotalSlots,
      setTotalTime,
      endTime,
      startTime,
    ]
  );

  const fetchCartData = useCallback(
    (FetchgroundData) => {
      const data = JSON.parse(localStorage.getItem("turfUserDetails"));
      const cartLocalId = localStorage.getItem("turfCart");

      setCartId(() => (cartLocalId ? cartLocalId : ""));

      if (data === null) {
        axios
          .get(
            api + "user/cart/guest?cartId=" + cartLocalId,
            headerWithoutToken
          )
          .then((res) => {
            handleFetchedData(res, FetchgroundData);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message);
            toast.error(err.message);
          });
      } else {
        axios
          .get(api + "user/cart?phoneNumber=" + data?.phoneNumber || "", {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            handleFetchedData(res, FetchgroundData);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.message);
            toast.error(err.message);
          });
      }
    },
    [handleFetchedData, setCartId, token]
  );

  const getAllSlotsByDateTime = useCallback(() => {
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
        const groundDataNew = res.data.body;
        console.log("Get All Slots by Date ", groundDataNew);
        if (groundDataNew) {
          if (groundDataNew.turf01) {
            groundDataNew.turf01.forEach((item) => {
              item.id = `${item.startTime}_g1_${item.date}`;
            });
          }

          if (groundDataNew.turf02) {
            groundDataNew.turf02.forEach((item) => {
              item.id = `${item.startTime}_g2_${item.date}`;
            });
          }

          if (groundDataNew.turf03) {
            groundDataNew.turf03.forEach((item) => {
              item.id = `${item.startTime}_g3_${item.date}`;
            });
          }

          fetchCartData(groundDataNew);
        } else {
          toast.error("No Slots Found");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        toast.error(error.message);
        console.log(error.message);
      });
  }, [
    isGroundSelected1,
    isGroundSelected2,
    isGroundSelected3,
    bookDate,
    fetchCartData,
  ]);

  useEffect(() => {
    getMaxAllowedMonth(setMaxAllowedDate);
    getAllSlotsByDateTime();
  }, [getAllSlotsByDateTime]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classnames("container is-fluid")}>
      <div className={classnames("columns", styles.columnsWrapper)}>
        <div className={classnames("column box", styles.addGroundBackground)}>
          <figure
            className={classnames("image is-clickable", styles.rotate1)}
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
            className={classnames("image is-clickable", styles.rotate)}
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
            className={classnames("image is-clickable", styles.rotate)}
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
            "column  is-two-thirds",
            styles.addMinHeight,
            styles.addBookingBackground
          )}
        >
          <div className={classnames(styles.timeBarWrapper)}>
            <div style={{ display: "flex" }} className={styles.dateWrapper}>
              <BiCalendarWeek size={40} color="#FFF" className="mx-3" />
              <div className="control has-icons-right">
                <input
                  className={classnames("input", styles.dateInputStyle)}
                  type="date"
                  placeholder="Pick Date"
                  value={bookDate}
                  min={new Date().toISOString().slice(0, 10)}
                  max={maxAllowedDate}
                  onChange={(event) => {
                    setBookDate(event.target.value);
                  }}
                />
                <span
                  className={classnames("icon is-right", styles.inputIcons)}
                >
                  <BiCalendarWeek color="#000" />
                </span>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <BiTime size={40} color="#FFF" className="mx-3" />
              <div className="control">
                <input
                  className={classnames("input", styles.dateInputStyle)}
                  type="time"
                  placeholder="Pick Start Time"
                  step="3600"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                />
              </div>
              <div className="control">
                <input
                  className={classnames("input ml-3", styles.dateInputStyle)}
                  type="time"
                  placeholder="Pick End Time"
                  step="3600"
                  min={startTime}
                  value={endTime}
                  onChange={(event) => {
                    if (event.target.value < startTime) {
                      toast.error(`Select End Time After ${startTime}`);
                      return;
                    }
                    setEndTime(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className={classnames(styles.slotsWrapper)}>
            <SlotItems />
          </div>
          <div className={classnames(styles.checkoutWrapper, "my-3")}>
            <div className={styles.timeBarWrapper}>
              <div
                style={{ display: "flex" }}
                className={(styles.dateWrapper, "is-hidden-touch")}
              >
                <div className="field">
                  <div className="control">
                    <input
                      className={classnames(
                        styles.hourcal,
                        "input is-size-4-mobile is-size-3"
                      )}
                      type="text"
                      placeholder="Total Hours"
                      readOnly
                      value={convertMinsToHrsMins(totalTime)}
                    />
                  </div>
                </div>
              </div>

              <Link
                to="/cart"
                className={classnames(
                  styles.checkoutbtn,
                  "button is-success is-light my-3 is-size-4-mobile is-size-3"
                )}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
