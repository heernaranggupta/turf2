import React, { useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { Context } from "../data/context";
import NextButton from "../components/NextButton";
import { getMaxAllowedMonth } from "../utils/getMaxMonth";
import Header from "../components/header";
import Logo from "../images/logo.png";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../css/pickDate.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "../components/footer";

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
      setGreetingMessage("Good Morning");
    } else if (curHr < 18) {
      setGreetingMessage("Good Afternoon");
    } else {
      setGreetingMessage("Good Evening");
    }

    const maxMonth = getMaxAllowedMonth();
    setMaxAllowedDate(maxMonth);
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className={classnames("column", styles.FirstColumn)}>
          <div className={classnames(styles.HeaderNav)}>
            <BsArrowLeft
              className="is-clickable"
              size={30}
              color="#FFF"
              onClick={() => history.push("/")}
            />
            <div className={classnames(styles.headerlogo)}>
              <img src={Logo} alt="" />
            </div>
            <div>
              <FaWhatsapp
                className="is-clickable mr-3"
                size={30}
                color="#FFF"
                onClick={() => {
                  window.open(
                    "https://api.whatsapp.com/send?phone=919725119988&text=Hi,%20I%20Would%20Like%20to%20Book%20Turf%20Ground%20@Rebounce",
                    "_blank"
                  );
                }}
              />
              <Header />
            </div>
          </div>
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
          {/* <h1 className="quote__text">{value}</h1> */}
          <h2 className={classnames("is-size-4", styles.quote)}>"Practice like you've never won. perform like you've never lost."</h2>

          <div className={classnames(styles.contentWrapper)}>
            <div className="field mt-1" style={{ width: "100%" }}>
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
      <Footer />
    </div>
  );
};

export default PickDate;
