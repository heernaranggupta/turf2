import React, { useState, useCallback, useEffect, useContext } from "react";
import classnames from "classnames";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../config/api";
import BookingSummaryElement from "./BookingSummaryElement";
import { Context } from "../data/context";
import { compareDateWithCurrentDate } from "../utils/compareDateWithCurrentDate";
import Loading from "../components/Loading";
import styles from "../css/BookingSummary.module.css";

const BookingSummary = () => {
  const [history, setHistory] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [cancelSlots, setCancelSlots] = useState([]);

  const { userData, token, isLoading, setIsLoading } = useContext(Context);

  const bookingSummary = useCallback(() => {
    axios
      .get(api + "user/booking-history", {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.body);
        const bookSlots = res.data?.body?.bookedTimeSlots || [];

        const upComingList = [];
        const historyList = [];
        const cancelledList = [];

        bookSlots.forEach((item) => {
          const data = compareDateWithCurrentDate(item.date);

          if (data) {
            if (
              item.status === "CANCELLED_BY_USER" ||
              item.status === "CANCELLED_BY_BUSINESS"
            ) {
              cancelledList.push(item);
            } else {
              upComingList.push(item);
            }
          } else {
            if (
              item.status === "CANCELLED_BY_USER" ||
              item.status === "CANCELLED_BY_BUSINESS"
            ) {
              cancelledList.push(item);
            } else {
              historyList.push(item);
            }
          }
        });
        setCancelSlots(cancelledList);
        setUpComing(upComingList);
        setHistory(historyList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleOnClickView = (index, ground, id, item) => {
    axios
      .get(api + "common/order/slot-list?orderId=" + item.orderId, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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
    axios
      .post(api + "user/cancel-booking", body, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Slot Cancelled");
        bookingSummary();
      });
  };

  useEffect(() => {
    bookingSummary();
  }, [bookingSummary, setIsLoading]);

  if (isLoading) {
    return <Loading />;
  }

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

      <div className={classnames("box", styles.dateCardWrapper)}>
        <p className="card-header title has-text-white p-5">Cancel Booking</p>
        <div className={classnames("card-content", styles.historygrid)}>
          {cancelSlots &&
            cancelSlots.map((item, index) => (
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
