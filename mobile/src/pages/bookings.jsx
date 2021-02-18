/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import classnames from "classnames";
import { BsArrowLeft } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Context } from "../data/context";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import styles from "../css/bookings.module.css";
import { getMaxAllowedMonth } from "../utils/getMaxMonth";
import { dateForAPI } from "../utils/dateConverter";
import { compareDate, compareTime, tConvert } from "../utils/TimeConverter";
import NextButton from "../components/NextButton";
import Loading from "../components/loading";

const Bookings = () => {
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    phoneNumber,
    token,
  } = useContext(Context);

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const [maxAllowedDate, setMaxAllowedDate] = useState("");
  const [amount, setAmount] = useState(0);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    const data = {
      turfIds: ["truf01", "truf02", "truf03"],
      date: date ? dateForAPI(date) : dateForAPI(""),
      slotDuration: 60,
    };
    axios
      .post(api + "user/mobile/get-all-slots-by-date", data, headerWithoutToken)
      .then((res) => {
        const slots = res.data.body.slotList;
        const newData = {};
        for (var key of Object.keys(res.data.body.slotList)) {
          if (!compareTime(startTime, key)) {
            if (!compareTime(key, endTime)) {
              newData[key] = slots[key];
            }
          }
        }
        setSlots({ ...newData });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        toast.error(error.message);
        console.log(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [date, startTime, endTime]);

  const addSlot = (selectedSlot) => {
    const data = {
      cartId: null,
      userPhoneNumber: phoneNumber,
      selectedSlots: [selectedSlot],
    };

    axios
      .post(api + "user/cart", data, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Slot Added To Cart");
        setAmount((amount) => amount + parseInt(selectedSlot.price));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        toast.error(error?.response?.data?.message);
      });
  };
  const removeSlot = (selectedSlot) => {
    const data = {
      cartId: null,
      userPhoneNumber: phoneNumber,
      removeSlot: selectedSlot,
    };

    axios
      .post(api + "user/cart/remove", data, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.warn("Slot Removed From Cart");
        setAmount((amount) => amount - parseInt(selectedSlot.price));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        toast.error(error?.response?.data?.message);
      });
  };

  const handleOnTDClick = (key, item) => {
    const allSlots = slots;
    const selectedSlot = allSlots[key][item];

    if (selectedSlot.isSelected) {
      removeSlot(selectedSlot);
      selectedSlot.isSelected = false;
    } else {
      addSlot(selectedSlot);
      selectedSlot.isSelected = true;
    }
    allSlots[key][item] = selectedSlot;
    setSlots({ ...allSlots });
  };

  const RenderTD = (key, item, disabled) => {
    if (slots[key][item].status === "AVAILABLE" && !disabled) {
      return (
        <td
          className={classnames(
            "is-clickable",
            slots[key][item].isSelected && styles.isSelected
          )}
          onClick={() => handleOnTDClick(key, item)}
        >
          <BiRupee />
          {slots[key][item].price}
        </td>
      );
    } else {
      return (
        <td
          className={classnames(
            "has-text-grey-light  has-background-danger-light",
            styles.inValidSlot
          )}
          style={{ textDecorationLine: "line-through" }}
        >
          <BiRupee />
          {slots[key][item].price}
        </td>
      );
    }
  };

  const RenderTable = (index, key, disabled = false) => {
    return (
      <tr key={index}>
        <td className={classnames("keyTh")}>{tConvert(key)}</td>
        {RenderTD(key, 0, disabled)}
        {RenderTD(key, 1, disabled)}
        {RenderTD(key, 2, disabled)}
      </tr>
    );
  };

  useEffect(() => {
    handleFetchData();
    const maxMonth = getMaxAllowedMonth();
    setMaxAllowedDate(maxMonth);
  }, [handleFetchData]);

  return (
    <div className="container">
      <div className={classnames("columns", styles.columns)}>
        <div className={classnames("column", styles.FirstColumn)}>
          <div className={classnames(styles.bookingsHeaderIcons)}>
            <BsArrowLeft
              className="is-clickable"
              size={30}
              color="#FFF"
              onClick={() => history.goBack()}
            />
            <div
              className={classnames(
                "dropdown is-right",
                dropdown && "is-active"
              )}
            >
              <div className="dropdown-trigger">
                <div
                  className="is-clickable"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  onClick={() => setDropdown((old) => !old)}
                >
                  <span>
                    <FiFilter size={30} color="#FFF" />
                  </span>
                </div>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <label className="checkbox">
                      <input type="checkbox" className="mx-1" />
                      Available
                    </label>
                  </div>
                  <div className="dropdown-item">
                    <label className="checkbox">
                      <input type="checkbox" className="mx-1" />
                      Unavailable
                    </label>
                  </div>
                  <div className="dropdown-item">
                    <label className="checkbox">
                      <input type="checkbox" className="mx-1" />
                      Only Comman
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classnames("column", styles.CenterColumn)}>
          <div className={classnames(styles.dateWrapper)}>
            <p>Date</p>
            <DatePicker
              placeholderText="Click to select a date"
              dateFormat="dd/MM/yyyy"
              className="input"
              value={date}
              selected={date}
              onChange={(date) => {
                setDate(date);
              }}
              minDate={new Date(new Date())}
              maxDate={maxAllowedDate}
            />
          </div>

          <div className={classnames(styles.startTimeWrapper)}>
            <p>Start Time</p>
            <input
              className="input"
              type="time"
              step="3600"
              placeholder="Pick Start Time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
            />
          </div>

          <div className={classnames(styles.endTimeWrapper)}>
            <p>End Time</p>
            <input
              className="input"
              type="time"
              step="3600"
              placeholder="Pick Start Time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <Loading text="Loading Slots" />
        ) : (
          <div className={classnames("column", styles.SecondColumn)}>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>
                    <abbr title="Ground 1 (Near Parking)">Turf 1</abbr>
                  </th>
                  <th>
                    <abbr title="Ground 2 (Center)">Turf 2</abbr>
                  </th>
                  <th>
                    <abbr title="Ground 3 (Near Food Court)">Turf 3</abbr>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(slots).map((key, index) => {
                  if (key) {
                    if (compareDate(date)) {
                      return RenderTable(index, key);
                    } else {
                      if (compareTime(key)) {
                        return RenderTable(index, key);
                      } else {
                        return RenderTable(index, key, true);
                      }
                    }
                  } else {
                    return <span></span>;
                  }
                })}
              </tbody>
            </table>
            {amount > 0 ? (
              <NextButton
                title={`Pay Now (INR ${amount})`}
                onClickHandler={() => {}}
              />
            ) : (
              <span></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
