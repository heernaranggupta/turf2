import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Context } from "../data/context";
import { filterData } from "../utils/filterData";
import { tConvert } from "../utils/TimeConverter";
import { ListData } from "../utils/serializeData";
import api from "../config/api";
import styles from "../css/cart.module.css";

const Cart = () => {
  const { setIsLoading, token, phoneNumber } = useContext(Context);
  const history = useHistory();
  const [cartData, setCartData] = useState(null);
  const [amount, setAmount] = useState(0);

  const options = {
    key: "rzp_test_LkGyvMQnSFDTBu",
    // key: 'rzp_live_VMGLEhEd6uLVJm',
    // keySecret: 'y3NEE7Eb12whbSSjdlLLbBR2',

    amount: amount * 100, //  = INR 1
    // amount: 1000,
    name: "Turf Booking",
    description:
      "Welcome to Rebounce You can pay with RazorPay and book your turf Ground",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      const listData = ListData(cartData);
      const body = {
        userId: phoneNumber,
        transactionId: response.razorpay_payment_id,
        timeSlots: listData,
      };
      axios
        .post(api + "common/order", body, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          history.push("/success");
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
    const listData = ListData(cartData);
    var rzp1 = new window.Razorpay(options);
    const postData = {
      timeSlotRequestList: listData,
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
              cartId: "",
              userPhoneNumber: phoneNumber || null,
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
            handleFetchCartData();
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

  const handleFetchCartData = useCallback(() => {
    if (phoneNumber) {
      setIsLoading(true);
      axios
        .get(api + "user/cart?phoneNumber=" + phoneNumber, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAmount(res?.data?.body?.cartTotal || 0);
          const sortedData = filterData(res.data.body);
          setCartData({ ...sortedData[0] });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message);
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setIsLoading, phoneNumber, token]);

  const handleSlotDelete = (item) => {
    const data = {
      cartId: null,
      userPhoneNumber: phoneNumber,
      removeSlot: item,
    };

    axios
      .post(api + "user/cart/remove", data, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        handleFetchCartData();
        toast.warn("Slot Removed From Cart");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        toast.error(error?.response?.data?.message);
      });
  };

  const RenderBlock = ({ turf, name }) => {
    if (turf.length) {
      return (
        <div className="box" style={{ background: "#BAE5D3" }}>
          <p className="subtitle">{name}</p>
          <hr />
          {turf.length &&
            turf.map((item, index) => {
              return (
                <div className="tags has-addons" key={index}>
                  <span className="tag is-large">
                    {tConvert(item.startTime)}
                  </span>
                  <span className="tag is-large is-success">
                    <BiRupee />
                    {item.price}
                  </span>
                  <div
                    className="tag is-large is-delete has-background-danger has-text-white is-clickable"
                    onClick={() => handleSlotDelete(item)}
                  ></div>
                </div>
              );
            })}
        </div>
      );
    } else {
      return <span></span>;
    }
  };

  useEffect(() => {
    handleFetchCartData();
  }, [handleFetchCartData]);

  return (
    <div className={classnames("container", styles.cartContainer)}>
      <div className="columns">
        <div className={classnames("column", styles.FirstColumn)}>
          <BsArrowLeft
            className="is-clickable"
            size={30}
            color="#FFF"
            onClick={() => history.push("/bookings")}
          />
          <FaWhatsapp
            className="is-clickable"
            size={30}
            color="#FFF"
            onClick={() => {
              window.open(
                "https://api.whatsapp.com/send?phone=919106054633&text=Hi,%20I%20Would%20Like%20to%20Book%20Turf%20Ground%20@Rebounce",
                "_blank"
              );
            }}
          />
        </div>

        {amount > 0 ? (
          <div className={classnames("column", styles.SecondColumn)}>
            {cartData &&
              Object.keys(cartData).map((key, index) => {
                const turf01 = cartData[key].turf01;
                const turf02 = cartData[key].turf02;
                const turf03 = cartData[key].turf03;
                return (
                  <div className="card mt-3" key={index}>
                    <header className="card-header">
                      <p className="card-header-title">{key}</p>
                    </header>
                    <div className="card-content">
                      <div className="content">
                        <RenderBlock turf={turf01} name="Turf 1" />
                        <RenderBlock turf={turf02} name="Turf 2" />
                        <RenderBlock turf={turf03} name="Turf 3" />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <article className="message is-success mt-5">
            <div className="message-header">
              <p>Cart Empty</p>
            </div>
            <div className="message-body m-3">
              <p>Your Cart is Empty.</p>
              <button
                className="button is-success my-3"
                onClick={() => history.push("/bookings")}
              >
                Book Now
              </button>
            </div>
          </article>
        )}
      </div>
      {amount > 0 ? (
        <div className={classnames("column", styles.CenterColumn)}>
          <div>
            <p className="subtitle mt-3 has-text-white">
              Pay, <span className="has-text-weight-bold ">INR {amount}</span>
            </p>
          </div>
          <button className="button" onClick={openPayModal}>
            Pay Now
          </button>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Cart;
