import React, { useEffect, useCallback, useContext, useState } from "react";
import classnames from "classnames";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Context } from "../data/context";
import headerWithoutToken from "../config/headerWithoutToken";
import api from "../config/api";
import { filterData } from "../utils/filterData";
import CartElement from "./CartElement";
import styles from "../css/Cart.module.css";

const Cart = () => {
  const { setCartId, cartData, setCartData } = useContext(Context);

  const [totalAmount, setTotalAmount] = useState(0);
  const [dateArray, setDateArray] = useState([]);

  const fetchCartData = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("turfUserDetails"));
    const cartLocalId = localStorage.getItem("turfCart");

    if (data === null && cartLocalId === null) {
      setCartId("");
    } else if (data === null && cartLocalId != null) {
      setCartId(cartLocalId);
    } else {
      //const data = JSON.parse(localStorage.getItem("turfUserDetails"));
      // setCartPhone(data.user.phoneNumber);
    }

    if (data === null) {
      axios
        .get(api + "user/cart?cartId=" + cartLocalId, headerWithoutToken)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            const [sortedData, dateArry] = filterData(res.data.body);
            setCartData(sortedData);
            setTotalAmount(res.data.body.cartTotal);
            setDateArray([...dateArry]);
          }
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
          if (res.data.success) {
            console.log(res.data);
            const [sortedData, dateArry] = filterData(res.data.body);
            setCartData(sortedData);
            setTotalAmount(res.data.body.cartTotal);
            setDateArray([...dateArry]);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
        });
    }
  }, [setCartId, setCartData]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <div className={classnames()}>
      <div className={classnames("columns")}>
        <div className={classnames("column box")}>Column 1</div>
        <div className={classnames("column box is-two-thirds")}>
          <div>
            {dateArray.map((item, index) => {
              const turf01 = cartData[item].turf01;
              const turf02 = cartData[item].turf02;
              const turf03 = cartData[item].turf03;

              return (
                <div key={index} className={classnames("box")}>
                  <header className="card-header">
                    <p className="card-header-title">{item}</p>
                  </header>
                  <div
                    className={classnames(
                      "card-content",
                      styles.allGroundsWrapper
                    )}
                  >
                    {turf01.length ? (
                      <CartElement data={turf01} label="Ground 1" />
                    ) : (
                      <span></span>
                    )}
                    {turf02.length ? (
                      <CartElement data={turf02} label="Ground 2" />
                    ) : (
                      <span></span>
                    )}

                    {turf03.length ? (
                      <CartElement data={turf03} label="Ground 3" />
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
