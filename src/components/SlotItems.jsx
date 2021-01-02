import React, { useContext } from "react";
import classnames from "classnames";
import "moment-timezone";
import styles from "../css/SlotItems.module.css";
import { Context } from "../data/context";
import { SlotCardItem } from "./SlotCardItem";
import { toast } from "react-toastify";
import api from "../config/api";
import axios from "axios";
import headerWithToken from "../config/headerWithToken";

const SlotItems = () => {
  const {
    groundData,
    setGroundData,
    temporaryCart,
    setTemporaryCart,
    setTotalTime,
    cartId,
    setCartId,
    phoneNumber,
  } = useContext(Context);

  const addToCart = (index, ground) => {
    var selectedSlot = null;
    if (ground === 1) {
      const newData = groundData.turf01;
      selectedSlot = newData[index];
    } else if (ground === 2) {
      const newData = groundData.turf02;
      selectedSlot = newData[index];
    } else if (ground === 3) {
      const newData = groundData.turf03;
      selectedSlot = newData[index];
    }

    if (selectedSlot !== null) {
      const body = {
        cartId: cartId,
        userPhoneNumber: phoneNumber,
        selectedSlots: [selectedSlot],
      };

      const url = api + "user/cart";
      axios
        .post(url, body, headerWithToken)
        .then(async (res) => {
          if (res.data.body.phoneNumber === undefined || null) {
            await localStorage.setItem("turfCart", res.data.body._cartId);
            setCartId(res.data.body._cartId);
          }

          if (res.data.success === true) {
            toast.success("Added Successfully to Cart");
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error.message);
        });
    }

    setTotalTime((i) => i + 30);
  };

  const removeFromCart = (index, ground, id) => {
    const data = temporaryCart;
    var newData = null;
    if (ground === 1) {
      const oldData = data.turf01;
      newData = oldData.filter((item) => item.id !== id);
      data.turf01 = newData;
    } else if (ground === 2) {
      const oldData = data.turf02;
      newData = oldData.filter((item) => item.id !== id);
      data.turf02 = newData;
    } else if (ground === 3) {
      const oldData = data.turf03;
      newData = oldData.filter((item) => item.id !== id);
      data.turf03 = newData;
    }

    const body = {
      cartId: cartId,
      userPhoneNumber: phoneNumber,
      removeSlot: newData,
    };
    const url = api + "user/cart/remove";
    axios
      .post(url, body, headerWithToken)
      .then(() => {
        toast.success("Removed from Cart");
      })
      .catch((err) => {
        console.log(err);
      });
    setTotalTime((i) => i - 30);
    setTemporaryCart(data);
  };

  const handleOnClick = (index, ground, id) => {
    if (ground === 1) {
      const newData = groundData.turf01;
      if (newData[index].isSelected) {
        //removeFromCart(index, ground, id);
        newData[index].isSelected = false;
      } else {
        addToCart(index, ground);
        newData[index].isSelected = true;
      }

      setGroundData({
        turf01: newData,
        turf02: groundData.turf02,
        turf03: groundData.turf03,
      });
    } else if (ground === 2) {
      const newData = groundData.turf02;
      if (newData[index].isSelected) {
        //removeFromCart(index, ground, id);
        newData[index].isSelected = false;
      } else {
        addToCart(index, ground);
        newData[index].isSelected = true;
      }

      setGroundData({
        turf01: groundData.turf01,
        turf02: newData,
        turf03: groundData.turf03,
      });
    } else if (ground === 3) {
      const newData = groundData.turf03;
      if (newData[index].isSelected) {
        //removeFromCart(index, ground, id);
        newData[index].isSelected = false;
      } else {
        addToCart(index, ground);
        newData[index].isSelected = true;
      }

      setGroundData({
        turf01: groundData.turf01,
        turf02: groundData.turf02,
        turf03: newData,
      });
    }
  };

  return (
    <div>
      <div className={styles.contentWrapper}>
        <div className={classnames(styles.slotHeaderWrapper)}>
          <p className="is-size-4-desktop is-size-6-touch is-uppercase has-text-white">
            Slots
          </p>
          <div className={classnames(styles.addHorizontalBar)}></div>
          <p
            className={classnames(
              "is-size-4-desktop is-size-6-touch is-uppercase has-text-white",
              styles.slotTitle
            )}
          >
            Ground 1
          </p>
        </div>

        <div className={classnames(styles.slotContentWrapper)}>
          {groundData.turf01 &&
            groundData.turf01.map((item, index) => (
              <SlotCardItem
                key={index}
                item={item}
                index={index}
                handleOnClick={handleOnClick}
                id={1}
              />
            ))}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={classnames(styles.slotHeaderWrapper)}>
          <p className="is-size-4-desktop is-size-6-touch is-uppercase has-text-white">
            Slots
          </p>
          <div className={classnames(styles.addHorizontalBar)}></div>
          <p
            className={classnames(
              "is-size-4-desktop is-size-6-touch is-uppercase has-text-white",
              styles.slotTitle
            )}
          >
            Ground 2
          </p>
        </div>

        <div className={classnames(styles.slotContentWrapper)}>
          {groundData.turf02 &&
            groundData.turf02.map((item, index) => (
              <SlotCardItem
                key={index}
                item={item}
                index={index}
                handleOnClick={handleOnClick}
                id={2}
              />
            ))}
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={classnames(styles.slotHeaderWrapper)}>
          <p className="is-size-4-desktop is-size-6-touch is-uppercase has-text-white">
            Slots
          </p>
          <div className={classnames(styles.addHorizontalBar)}></div>
          <p
            className={classnames(
              "is-size-4-desktop is-size-6-touch is-uppercase has-text-white",
              styles.slotTitle
            )}
          >
            Ground 3
          </p>
        </div>

        <div className={classnames(styles.slotContentWrapper)}>
          {groundData.turf03 &&
            groundData.turf03.map((item, index) => (
              <SlotCardItem
                key={index}
                item={item}
                index={index}
                handleOnClick={handleOnClick}
                id={3}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SlotItems;
