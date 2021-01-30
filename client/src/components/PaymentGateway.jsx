import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import headerWithToken from "../config/headerWithToken";
import { Context } from "../data/context";
import api, { mailapi } from "../config/api";
import { ListData } from "../utils/ListData";
import styles from "../css/Payment.module.css";

const PaymentGateway = () => {
  const { cartData, totalAmount, isLoggedIn, userData } = useContext(Context);
  const allData = ListData(cartData);

  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [responce, setResponce] = useState(null);

  const options = {
    key: "rzp_test_LkGyvMQnSFDTBu",
    // key: 'rzp_live_VMGLEhEd6uLVJm',
    // keySecret: 'y3NEE7Eb12whbSSjdlLLbBR2',

    amount: totalAmount * 100, //  = INR 1
    // amount: 1000,
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
        transactionId: response.razorpay_payment_id,
        timeSlots: allData,
      };
      console.log(body);
      axios
        .post(api + "common/order", body, headerWithToken)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            fetch(mailapi, {
              method: "post",
              body: JSON.stringify({
                name: userData.name,
                email: userData.emailId,
                slots: res.data?.body?.timeSlots || [],
                paymentId: res.data?.body?.paymentId,
              }),
            });
            history.push("/payment-success");
          }
        })
        .catch((err) => {
          console.log(err.message);
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

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    const postData = {
      timeSlotRequestList: allData,
    };
    axios
      .post(api + "common/validate", postData, headerWithToken)
      .then((res) => {
        const validateSlots = res.data.body.timeSlotResponses.filter(function (
          item
        ) {
          return item.status === "NOT_AVAILABLE";
        });
        if (validateSlots.length === 0) {
          console.log("All Slots AVAILABLE");
          rzp1.open();
        } else {
          console.log("some slots is not available");
        }
        console.log("validate", res);
      })
      .catch((err) => {
        console.log(err.response);
      });
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
            {/* <fieldset id="group1">
              <input type = "radio" value={payFull} onChange={e => {setPayFull(e.target.value);console.log(e.target.value)}} name="amt"/><lable>Pay Full Payment</lable><br/>
              <input type = "radio" value={payHalf} onChange={e => {setPayHalf(e.target.value),console.log(e.target.value)}} name="amt"/><lable>Pay 30% Payment</lable>
            </fieldset> */}
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
