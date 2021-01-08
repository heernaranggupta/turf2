import React, { useState, useCallback, useEffect } from "react";
import classnames from "classnames";
import styles from "../css/Cart.module.css";
import axios from "axios";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
import { SlotCardItem } from "./SlotCardItem";
import cartStyles from "../css/SlotItems.module.css";

const BookingSummary = () =>{

    const [bookingList,setBookingList] = useState([])

    const bookingSummary = useCallback(() =>{
        const data = JSON.parse(localStorage.getItem("turfUserDetails"))
        axios.get(api + 'user/booking-history?userPhoneNumber=' + data.user.phoneNumber,headerWithToken).then(res=>{
            
            console.log(res.data.body.bookedTimeSlots)
            console.log("time",new Date().toISOString())
            setBookingList(res.data.body.bookedTimeSlots)
        }).catch(err=>{
            console.log(err)
        })
    })

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
                {bookingList &&
                    bookingList.map((item, index) => (
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
            </header>

        </div>
    );
}
export default BookingSummary;