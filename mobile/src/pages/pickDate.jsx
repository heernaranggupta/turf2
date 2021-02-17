import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";
import { getMaxAllowedMonth } from "../utils/getMaxMonth";

import "react-datepicker/dist/react-datepicker.css";
import styles from "../css/pickDate.module.css";

const PickDate = () => {
  const history = useHistory();

  const [greetingMessage, setGreetingMessage] = useState("");
  const [maxAllowedDate, setMaxAllowedDate] = useState("");

  const {
    name,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  } = useContext(Context);

  const handleNextClick = () => {
    if (date === null || date === "") {
      toast.error("Select Valid Date");
      return;
    }
    if (startTime === "") {
      toast.error("Select Valid Start Time");
      return;
    }
    if (endTime === "") {
      toast.error("Select Valid End Time");
      return;
    }
    history.push("/bookings");
  };

  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      setGreetingMessage("Good Morning,");
    } else if (curHr < 18) {
      setGreetingMessage("Good Afternoon,");
    } else {
      setGreetingMessage("Good Evening,");
    }

    const maxMonth = getMaxAllowedMonth();
    setMaxAllowedDate(maxMonth);
  }, []);

  return (
    <div className="conatiner">
      <div className="columns">
        <div className={classnames("column", styles.FirstColumn)}>
          <BsArrowLeft
            size={30}
            color="#FFF"
            onClick={() => history.goBack()}
          />
          <div>
            <p className="is-size-5 has-text-white">{greetingMessage}</p>
            <p className="title has-text-white">{name}</p>
          </div>
        </div>
        <div className={classnames("column", styles.SecondColumn)}>
          <div>
            <p className="is-size-5">Let's Start</p>
            <p className="is-size-4 has-text-weight-bold">Pick Date & Time</p>
          </div>

          <div className={classnames(styles.contentWrapper)}>
            <div className="field mt-6" style={{ width: "100%" }}>
              <label className="label">Pick Date</label>
              <div className="control">
                <DatePicker
                  placeholderText="Click to select a date"
                  dateFormat="dd/MM/yyyy"
                  className="input"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  minDate={new Date(new Date())}
                  maxDate={maxAllowedDate}
                />
              </div>
            </div>

            <div className={classnames(styles.timeWrapper)}>
              <div className={classnames("field", styles.field)}>
                <label className="label">Start Time</label>
                <div className="control">
                  <input
                    className="input"
                    type="time"
                    step="3600"
                    placeholder="Pick Start Time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                  />
                </div>
              </div>

              <div className={classnames("field", styles.field)}>
                <label className="label">End Time</label>
                <div className="control">
                  <input
                    className="input"
                    type="time"
                    step="3600"
                    placeholder="Pick End Time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <NextButton title="Next" onClickHandler={handleNextClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickDate;
