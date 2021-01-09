import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import headerWithToken from "../config/headerWithToken";
import { Context } from "../data/context";
import api from "../config/api";
import { ListData } from "../utils/ListData";
import styles from "../css/Payment.module.css";

const PaymentGateway = () => {
  const { cartData, totalAmount, isLoggedIn } = useContext(Context);
  const allData = ListData(cartData);

  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [responce, setResponce] = useState(null);

  const options = {
    key: "rzp_test_ZcSb49CvQ0NZhe",
    
    // amount: totalAmount * 100, //  = INR 1
    amount: 1000,
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
        timeSlots: allData,
      };
      console.log(body);
      axios
        .post(api + "common/order", body, headerWithToken)
        .then((res) => {
          console.log(res);
          if(res.data.body.message === 'slot with start time 11:30 on date 2021-01-10 is already booked.'){
            //
          }
          if(res.data.body.message === '' || res.data.body.message === null){
            history.push('/payment-success')
          }
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
    <div className={styles.PaymentWrapper}>
      {totalAmount > 0 ? (
        <div>
          <figure
            className="image is-clickable"
            style={{ width: "250px" }}
            onClick={() => {
              if (isLoggedIn) {
                openPayModal();
              } else {
                history.push("/login");
              }
            }}
          >
            <button className="button is-success p-5">
              <img
                src="https://razorpay.com/assets/razorpay-logo-white.svg"
                alt="Razor Pay"
              />
            </button>
          </figure>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default PaymentGateway;
