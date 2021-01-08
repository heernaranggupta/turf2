import React, { useState, useCallback, useEffect } from "react";
import classnames from "classnames";
import styles from "../css/Cart.module.css";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
import { SlotCardItem } from "./SlotCardItem";
import cartStyles from "../css/SlotItems.module.css";

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
                    return new Date() <= new Date(item.date)
                }
              );
            setUpComing(filterUpComing)
            const filterHistory = res.data.body.bookedTimeSlots.filter(
                function (item) {
                    return new Date() >= new Date(item.date)
                }
              );
            setHistory(filterHistory)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const handleOnClick = (index, ground, id, item) => {
        console.log("delete booking")
    }

    useEffect(()=>{
        bookingSummary();
    },[bookingSummary])

    return(
        <div className={classnames("box", styles.dateCardWrapper)}>
            <header className="card-header">
              <p className="card-header-title has-text-white">Upcoming Booking</p>
              <div className={classnames(cartStyles.slotContentWrapper)}>
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
            <header className="card-header">
              <p className="card-header-title has-text-white">Booking History</p>
              {history &&
                    history.map((item, index) => (
                    <SlotCardItem
                        key={index}
                        item={item}
                        index={index}
                        handleOnClick={handleOnClick}
                        id={1}
                    />
                ))}
            </header>

        </div>
    );
}
export default BookingSummary;