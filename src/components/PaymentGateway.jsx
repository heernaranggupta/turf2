import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import headerWithToken from "../config/headerWithToken";
import { Context } from "../data/context";
import api from "../config/api";
import { ListData } from "../utils/ListData";


const PaymentGateway = () => {
  const { cartData } = useContext(Context);
  const allData = ListData(cartData);

  const [responce, setResponce] = useState(null);

  const options = {
    key: "rzp_test_ZcSb49CvQ0NZhe",
    // keyId: rzp_test_ZcSb49CvQ0NZhe
    // keySecret: Qy4DDJgdGCbkABNYhRrn7CMH
    // amount: totalAmount * 100, //  = INR 1
    amount: 100,
    name: "Turf Booking",
    description:
      "Welcome to Rebounce You can pay with RazorPay and book your turf Ground",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      console.log(response.razorpay_payment_id);
      setResponce(response.razorpay_payment_id);
      const data = JSON.parse(localStorage.getItem("turfUserDetails"));
      const body = {
        userId: data.user.phoneNumber,
        timeSlots: [allData],
      };
      console.log(body)
      axios
        .post(api + "common/order", body, headerWithToken)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    prefill: {
      name: "Neha",
      contact: "9999999999",
      email: "demo@demo.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = async () => {
    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
  };
  return (
    <div>
      <p>Payment Gateway</p>
      <input type="submit" value="Razor Pay" onClick={openPayModal} />
    </div>
  );
};

export default PaymentGateway;
