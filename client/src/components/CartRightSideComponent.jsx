import React, { useState, useCallback, useContext, useEffect } from "react";
import classnames from "classnames";
import { Context } from "../data/context";
import styles from "../css/Cart.module.css";
import CartElement from "./CartElement";
import { filterData } from "../utils/filterData";
import axios from "axios";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";
import { Link } from "react-router-dom";

var IS_MOUNTED = false;
const CartRightSideComponent = () => {
  const {
    setCartId,
    setCartData,
    cartData,
    setTotalAmount,
    setTotalSlots,
    setIsCartEmpty,
    isCartEmpty,
    setTotalTime,
    token,
  } = useContext(Context);

  const [dateArray, setDateArray] = useState([]);

  const handleFetchedData = useCallback(
    (res) => {
      console.log("cart length", res);
      if (res?.data?.success) {
        if (res?.data?.body) {
          if (res.data.body.selectedSlots.length) {
            const [sortedData, dateArry] = filterData(res.data.body);
            if (IS_MOUNTED) {
              setTotalSlots(res.data.body.selectedSlots.length);
              setCartData(sortedData);
              setTotalAmount(res.data.body.cartTotal);
              setDateArray([...dateArry]);
              setIsCartEmpty(false);
            }
          } else {
            setIsCartEmpty(true);
            setTotalAmount(0);
            setTotalSlots(0);
            setTotalTime(0);
          }
        } else {
          setIsCartEmpty(true);
          setTotalAmount(0);
          setTotalSlots(0);
          setTotalTime(0);
        }
      } else {
        setIsCartEmpty(true);
        setTotalAmount(0);
        setTotalSlots(0);
        setTotalTime(0);
      }
    },
    [setCartData, setIsCartEmpty, setTotalAmount, setTotalSlots, setTotalTime]
  );

  const fetchCartData = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("turfUserDetails"));
    const cartLocalId = localStorage.getItem("turfCart");

    setCartId(() => (cartLocalId ? cartLocalId : null));

    if (data === null) {
      axios
        .get(api + "user/cart/guest?cartId=" + cartLocalId, headerWithoutToken)
        .then((res) => {
          handleFetchedData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(api + "user/cart?phoneNumber=" + data?.phoneNumber || "", {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          handleFetchedData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [handleFetchedData, setCartId, token]);

  useEffect(() => {
    IS_MOUNTED = true;

    if (IS_MOUNTED) {
      fetchCartData();
    }

    return () => {
      IS_MOUNTED = false;
    };
  }, [fetchCartData]);

  if (isCartEmpty) {
    return (
      <div className={classnames("container", styles.isCartEmptyWrapper)}>
        <article className="message is-success is-large">
          <div className="message-header">
            <p>Message</p>
          </div>
          <div className="message-body">Your Cart is Empty</div>
          <Link to="/book" className="button is-success m-5">
            Book Slots
          </Link>
        </article>
      </div>
    );
  }

  return (
    <div>
      {dateArray.map((item, index) => {
        const turf01 = cartData[item]?.turf01 || [];
        const turf02 = cartData[item]?.turf02 || [];
        const turf03 = cartData[item]?.turf03 || [];

        return (
          <div
            key={index}
            className={classnames("box", styles.dateCardWrapper)}
          >
            <header
              className={classnames(styles.cardheader, "card-header my-3")}
            >
              <p className="card-header-title has-text-white">{item}</p>
            </header>
            <div
              className={classnames("card-content", styles.allGroundsWrapper)}
            >
              {turf01.length ? (
                <CartElement
                  data={turf01}
                  label="Ground 1"
                  reloadData={fetchCartData}
                />
              ) : (
                <span style={{ display: "none" }}></span>
              )}
              {turf02.length ? (
                <CartElement
                  data={turf02}
                  label="Ground 2"
                  reloadData={fetchCartData}
                />
              ) : (
                <span style={{ display: "none" }}></span>
              )}

              {turf03.length ? (
                <CartElement
                  data={turf03}
                  label="Ground 3"
                  reloadData={fetchCartData}
                />
              ) : (
                <span style={{ display: "none" }}></span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartRightSideComponent;
