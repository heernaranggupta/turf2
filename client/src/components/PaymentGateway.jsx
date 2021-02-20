import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Context } from "../data/context";
import api, { TurfMail } from "../config/api";
import { ListData } from "../utils/ListData";
import styles from "../css/Payment.module.css";
import { toast } from "react-toastify";

const PaymentGateway = () => {
  const {
    cartData,
    totalAmount,
    isLoggedIn,
    userData,
    token,
    cartId,
  } = useContext(Context);
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
        userId: data?.user?.phoneNumber,
        transactionId: response.razorpay_payment_id,
        timeSlots: allData,
      };
      console.log(body);
      axios
        .post(api + "common/order", body, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            axios.post(TurfMail + "bookings", {
              name: userData.name,
              email: userData.emailId,
              slots: res.data?.body?.timeSlots || [],
              paymentId: res.data?.body?.paymentId,
            });
            history.push("/payment-success");
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          toast.error(err.message);
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
      .post(api + "common/validate", postData, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const slots = res.data.body.timeSlotResponses || [];

        let length = 0;
        slots.forEach((item) => {
          if (item.status === "NOT_AVAILABLE") {
            const body = {
              cartId: cartId,
              userPhoneNumber: userData?.phoneNumber || null,
              removeSlot: item,
            };

            const url = api + "user/cart/remove";
            axios
              .post(url, body, {
                headers: {
                  "Content-Type": "Application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message);
                toast.error(err.message);
                console.log(err);
              });

            length += 1;
          }
        });

        if (length > 0) {
          toast.warn(`${length} Unavailable slots were deleted`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          rzp1.open();
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        toast.error(err.message);
        console.log(err.response);
      });
  };

  return (
    <div className={styles.PaymentWrapper}>
      {totalAmount > 0 ? (
        <div>
          <div
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
            <button className="button is-success p-5 is-large">Pay Now</button>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default PaymentGateway;
