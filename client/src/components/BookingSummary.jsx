import React, { useState, useCallback, useEffect, useContext } from "react";
import classnames from "classnames";
import styles from "../css/BookingSummary.module.css";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
import BookingSummaryElement from "./BookingSummaryElement";
import { Context } from "../data/context";

import { compareDateWithCurrentDate } from "../utils/compareDateWithCurrentDate";

const BookingSummary = () => {
  const [history, setHistory] = useState([]);
  const [upcoming, setUpComing] = useState([]);

  const { userData } = useContext(Context);

  const bookingSummary = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("turfUserDetails"));
    axios
      .get(
        api + "user/booking-history?userPhoneNumber=" + data?.user?.phoneNumber,
        headerWithToken
      )
      .then((res) => {
        console.log(res.data.body);
        const bookSlots = res.data?.body?.bookedTimeSlots || [];

        const upComingList = [];
        const historyList = [];
        bookSlots.forEach((item) => {
          const data = compareDateWithCurrentDate(item.date);

          if (data) {
            upComingList.push(item);
          } else {
            historyList.push(item);
          }
        });
        setUpComing(upComingList);
        setHistory(historyList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnClickView = (index, ground, id, item) => {
    axios
      .get(
        api + "common/order/slot-list?orderId=" + item.orderId,
        headerWithToken
      )
      .then((res) => {
        console.log("invoice", res.data);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // axios
    //   .get(api + "payment/details?orderId=" + item.orderId, headerWithToken)
    //   .then(async (res) => {
    //     console.log("invoice", res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };

  const handleOnClick = (index, ground, id, item) => {
    const body = {
      bookingId: item.bookingId,
      price: item.price,
      turfId: item.turfId,
      userId: item.userId,
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
    };
    window.confirm('Are you sure you wish to delete this item?') ?  
      axios
        .post(api + "user/cancel-booking", body, headerWithToken)
        .then((res) => {
          if(res.data.body.status === 'CANCELLED_BY_USER'){
            window.location.reload(false)
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })

      : console.log("cancel")

  };

  useEffect(() => {
    bookingSummary();
  }, [bookingSummary]);

  return (
    <>
      <div className={classnames("box", styles.dateCardWrapper)}>
        <p className="card-header p-5 title has-text-white">Upcoming Booking</p>
        <div className={classnames("card-content", styles.historygrid)}>
          {upcoming &&
            upcoming.map((item, index) => (
              <BookingSummaryElement
                key={index}
                item={item}
                index={index}
                handleOnClick={handleOnClick}
                handleOnClickView={handleOnClickView}
                id={1}
              />
            ))}
        </div>
      </div>
      <div className={classnames("box", styles.dateCardWrapper)}>
        <p className="card-header title has-text-white p-5">Booking History</p>
        <div className={classnames("card-content", styles.historygrid)}>
          {history &&
            history.map((item, index) => (
              <BookingSummaryElement
                key={index}
                item={item}
                index={index}
                handleOnClick={() => {}}
                handleOnClickView={() => {}}
                isHistory={true}
                id={1}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default BookingSummary;
