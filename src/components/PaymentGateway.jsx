import React, { useEffect, useContext, useState } from "react";
import { Context } from "../data/context";

const PaymentGateway = () => {
  const { totalAmount } = useContext(Context);

  const [responce, setResponce] = useState(null);

  const options = {
    key: "rzp_test_ZcSb49CvQ0NZhe",
    // keyId: rzp_test_ZcSb49CvQ0NZhe
    // keySecret: Qy4DDJgdGCbkABNYhRrn7CMH
    amount: totalAmount * 100, //  = INR 1
    name: "Turf Booking",
    description:
      "Welcome to Rebounce You can pay with RazorPay and book your turf Ground",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      // alert(response.razorpay_payment_id);
      setResponce(response.razorpay_payment_id);
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
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return (
    <div>
      <p>Payment Gateway</p>
    </div>
  );
};

export default PaymentGateway;
