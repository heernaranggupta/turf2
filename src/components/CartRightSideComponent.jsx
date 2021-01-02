import React, { useState, useCallback, useContext, useEffect } from "react";
import classnames from "classnames";
import { Context } from "../data/context";
import styles from "../css/Cart.module.css";
import CartElement from "./CartElement";
import { filterData } from "../utils/filterData";
import axios from "axios";
import api from "../config/api";
import headerWithoutToken from "../config/headerWithoutToken";

const CartRightSideComponent = () => {
  const {
    setCartId,
    setCartData,
    cartData,
    setPhoneNumber,
    setTotalAmount,
    setTotalSlots,
    setIsCartEmpty,
  } = useContext(Context);

  const [dateArray, setDateArray] = useState([]);

  const handleFetchedData = useCallback(
    (res) => {
      if (res.data.success) {
        if (res.data.body) {
          if (res.data.body.selectedSlots.length) {
            const [sortedData, dateArry] = filterData(res.data.body);
            setTotalSlots(res.data.body.selectedSlots.length);
            setCartData(sortedData);
            setTotalAmount(res.data.body.cartTotal);
            setDateArray([...dateArry]);
            setIsCartEmpty(false);
          } else {
            setIsCartEmpty(true);
          }
        } else {
          setIsCartEmpty(true);
        }
      }
    },
    [setCartData, setIsCartEmpty, setTotalAmount, setTotalSlots]
  );

  const fetchCartData = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("turfUserDetails"));
    const cartLocalId = localStorage.getItem("turfCart");

    setCartId(() => (cartLocalId ? cartLocalId : null));

    setPhoneNumber(() =>
      data?.user?.phoneNumber ? data.user.phoneNumber : null
    );

    // if (data === null && cartLocalId === null) {
    //   setCartId(null);
    // } else if (data === null && cartLocalId != null) {
    //   setCartId(cartLocalId);
    // } else {
    //   setPhoneNumber(data.user.phoneNumber);
    // }

    if (data === null) {
      axios
        .get(api + "user/cart?cartId=" + cartLocalId, headerWithoutToken)
        .then((res) => {
          handleFetchedData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          api + "user/cart?phoneNumber=" + data.user.phoneNumber,
          headerWithoutToken
        )
        .then((res) => {
          handleFetchedData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [handleFetchedData, setCartId, setPhoneNumber]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <div>
      {dateArray.map((item, index) => {
        const turf01 = cartData[item].turf01 || [];
        const turf02 = cartData[item].turf02 || [];
        const turf03 = cartData[item].turf03 || [];

        return (
          <div
            key={index}
            className={classnames("box", styles.dateCardWrapper)}
          >
            <header className="card-header">
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
                <span></span>
              )}
              {turf02.length ? (
                <CartElement
                  data={turf02}
                  label="Ground 2"
                  reloadData={fetchCartData}
                />
              ) : (
                <span></span>
              )}

              {turf03.length ? (
                <CartElement
                  data={turf03}
                  label="Ground 3"
                  reloadData={fetchCartData}
                />
              ) : (
                <span></span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartRightSideComponent;
