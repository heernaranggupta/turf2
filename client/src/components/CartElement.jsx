import React, { useContext } from "react";
import classnames from "classnames";
import { BiRupee } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../data/context";
import api from "../config/api";
import { tConvert } from "../utils/TimeConverter";
import headerWithoutToken from "../config/headerWithoutToken";
import styles from "../css/CartElement.module.css";

const CartElement = ({ data, label, reloadData }) => {
  const { userData, cartId, setTotalTime, token, isLoggedIn } = useContext(
    Context
  );

  const onRemoveSlots = (e) => {
    const body = {
      cartId: cartId,
      userPhoneNumber: userData?.phoneNumber || null,
      removeSlot: e,
    };
    if (isLoggedIn) {
      const url = api + "user/cart/remove";
      axios
        .post(url, body, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.warn("Removed from Cart");
          setTotalTime((oldTime) => oldTime - 30);
          reloadData();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          toast.error(err.message);
          console.log(err);
        });
    } else {
      const url = api + "user/cart/guest/remove";
      axios
        .post(url, body, headerWithoutToken)
        .then(() => {
          toast.warn("Removed from Cart");
          setTotalTime((oldTime) => oldTime - 30);
          reloadData();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          toast.error(err.message);
          console.log(err);
        });
    }
  };
  return (
    <div className={classnames("box", styles.groundWrapper)}>
      <p className={classnames("title has-text-white", styles.GroundLabel)}>
        {label}
      </p>
      <div className={styles.scrollGroundItems}>
        {data.map((item, index) => {
          return (
            <div
              className={classnames("box", styles.groundItemWrapper)}
              key={index}
            >
              <div className={styles.timeDurationWrapper}>
                <p>{tConvert(item.startTime)}</p>
                <p>{tConvert(item.endTime)}</p>
              </div>

              <div className={styles.currencyWrapper}>
                <p className={(styles.slotPriceWrapper, "title is-4")}>
                  <span>
                    <BiRupee size={20} color={"#000"} />
                  </span>
                  <span>{item.price}</span>
                </p>
              </div>

              <span
                onClick={() => onRemoveSlots(item)}
                className={classnames(styles.deleteWrapper, "is-clickable")}
              >
                <MdDelete size={30} color="#FFF" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartElement;
