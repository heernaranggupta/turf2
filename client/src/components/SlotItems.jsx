import React, { useContext } from "react";
import classnames from "classnames";
import styles from "../css/SlotItems.module.css";
import { Context } from "../data/context";
import { SlotCardItem } from "./SlotCardItem";
import { toast } from "react-toastify";
import api from "../config/api";
import axios from "axios";
import { compareDate, compareTime } from "../utils/compareTime";
import headerWithoutToken from "../config/headerWithoutToken";

const SlotItems = () => {
  const {
    groundData,
    setGroundData,
    setTotalTime,
    cartId,
    setCartId,
    userData,
    setTotalSlots,
    token,
    isLoggedIn,
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
        userPhoneNumber: userData?.phoneNumber || null,
        selectedSlots: [selectedSlot],
      };

      if (isLoggedIn) {
        const url = api + "user/cart";
        axios
          .post(url, body, {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async (res) => {
            if (res.data.body.phoneNumber === undefined || null) {
              await localStorage.setItem("turfCart", res.data.body._cartId);
              setCartId(res.data.body._cartId);
            }

            if (res.data.success === true) {
              // toast.success("Added Successfully to Cart");
              setTotalSlots((old) => old + 1);
            }
          })
          .catch((error) => {
            toast.error(error.message);
            console.log(error.message);
          });
      } else {
        const url = api + "user/cart/guest";
        axios
          .post(url, body, headerWithoutToken)
          .then(async (res) => {
            if (res.data.body.phoneNumber === undefined || null) {
              await localStorage.setItem("turfCart", res.data.body._cartId);
              setCartId(res.data.body._cartId);
            }

            if (res.data.success === true) {
              // toast.success("Added Successfully to Cart");
              setTotalSlots((old) => old + 1);
            }
          })
          .catch((error) => {
            toast.error(error.message);
            console.log(error.message);
          });
      }
    }

    setTotalTime((i) => i + 30);
  };

  const removeFromCart = (index, ground, id, item) => {
    const body = {
      cartId: cartId,
      userPhoneNumber: userData?.phoneNumber || null,
      removeSlot: item,
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
          // toast.warning("Removed from Cart");
          setTotalSlots((old) => old - 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const url = api + "user/cart/guest/remove";
      axios
        .post(url, body, headerWithoutToken)
        .then(() => {
          // toast.warning("Removed from Cart");
          setTotalSlots((old) => old - 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setTotalTime((i) => i - 30);
  };

  const handleOnClick = (index, ground, id, item) => {
    if (ground === 1) {
      const newData = groundData.turf01;
      if (newData[index].isSelected) {
        removeFromCart(index, ground, id, item);
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
        removeFromCart(index, ground, id, item);
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
        removeFromCart(index, ground, id, item);
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

  const GenerateSlots = (item, index, id) => {
    if (item.status === "AVAILABLE") {
      if (compareDate(item.date)) {
        // Future Dates
        return (
          <SlotCardItem
            key={index}
            item={item}
            index={index}
            handleOnClick={handleOnClick}
            id={id}
          />
        );
      } else {
        // For Today
        if (compareTime(item.startTime)) {
          // If Today In Future Time
          return (
            <SlotCardItem
              key={index}
              item={item}
              index={index}
              handleOnClick={handleOnClick}
              id={id}
            />
          );
        } else {
          // If Today In Past Time  [Disabled]
          return (
            <SlotCardItem
              key={index}
              item={item}
              index={index}
              handleOnClick={() => {}}
              id={id}
              isDisabled={true}
            />
          );
        }
      }
    } else {
      // If Slots are Not Available [Disabled]
      return (
        <SlotCardItem
          key={index}
          item={item}
          index={index}
          handleOnClick={() => {}}
          isDisabled={true}
          id={id}
        />
      );
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
            groundData.turf01.map((item, index) => {
              return GenerateSlots(item, index, 1);
            })}
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
            groundData.turf02.map((item, index) => {
              return GenerateSlots(item, index, 2);
            })}
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

        <div className={classnames(styles.slotContentWrapper, "mb-6")}>
          {groundData.turf03 &&
            groundData.turf03.map((item, index) => {
              return GenerateSlots(item, index, 3);
            })}
          <div className="mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default SlotItems;
