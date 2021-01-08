import React, { useState, useCallback, useEffect } from "react";
import classnames from "classnames";
import styles from "../css/BookingSummary.module.css";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
import { SlotCardItem } from "./SlotCardItem";

const BookingSummary = () =>{

    const [history,setHistory] = useState([])
    const [upcoming,setUpComing] = useState([])

    const bookingSummary = useCallback(() =>{
        const data = JSON.parse(localStorage.getItem("turfUserDetails"))
        axios.get(api + 'user/booking-history?userPhoneNumber=' + data.user.phoneNumber,headerWithToken).then(res=>{
          debugger
            console.log(res.data)
            const filterUpComing = res.data.body.bookedTimeSlots.filter(
                function (item) {
                    console.log(new Date())
                    return new Date() < new Date(item.date)
                }
              );
            setUpComing(filterUpComing)
            const filterHistory = res.data.body.bookedTimeSlots.filter(
                function (item) {
                    return new Date() > new Date(item.date)
                }
              );
            setHistory(filterHistory)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const handleOnClick = (index, ground, id, item) => {
        console.log("delete",item)
        const body ={
            "bookingId": item.bookingId,
            "price": item.price,
            "turfId": item.turfId,
            "userId": item.userId,
            "date": item.date,
            "startTime": item.startTime,
            "endTime": item.endTime
        }
        axios.post(api + 'user/cancel-booking',body,headerWithToken).then(res=>{
            console.log(res.data)
        })
    }

    useEffect(()=>{
        bookingSummary();
    },[])

    return(
        <div className={classnames("box", styles.dateCardWrapper)}>
            <header className={classnames(styles.historygrid ,"card-header")}>
              <p className="card-header-title has-text-white">Upcoming Booking</p>
              <div className={classnames(styles.slotContentWrapper)}>
                {upcoming &&
                    upcoming.map((item, index) => (
                    <SlotCardItem
                        key={index}
                        item={item}
                        index={index}
                        handleOnClick={handleOnClick}
                        id={1}
                    />
                ))}
            </div>
            </header>
            <header className={classnames(styles.historygrid ,"card-header")}>
              <p className="card-header-title has-text-white">Booking History</p>
              {history &&
                    history.map((item, index) => (
                    <SlotCardItem
                        key={index}
                        item={item}
                        index={index}
                        handleOnClick={() => {}}
                        id={1}
                    />
                ))}
            </header>

        </div>
    );
}
export default BookingSummary;