import React, { useContext } from "react";
import classnames from "classnames";
import "moment-timezone";
import styles from "../css/SlotItems.module.css";

import { Context } from "../data/context";
import { SlotCardItem } from "./SlotCardItem";

const SlotItems = () => {
  const {
    groundData,
    setGroundData,
    temporaryCart,
    setTemporaryCart,
    setTotalTime,
  } = useContext(Context);

  const addToCart = (index, ground) => {
    const data = temporaryCart;
    if (ground === 1) {
      const newData = groundData.turf01;
      data.turf01.push(newData[index]);
    } else if (ground === 2) {
      const newData = groundData.turf02;
      data.turf02.push(newData[index]);
    } else if (ground === 3) {
      const newData = groundData.turf03;
      data.turf03.push(newData[index]);
    }

    setTotalTime((i) => i + 30);
    setTemporaryCart(data);

    console.log("Added", data);
  };
  const removeFromCart = (index, ground, id) => {
    console.log("Remove Cart: ", index, ground, id);
    const data = temporaryCart;
    if (ground === 1) {
      const oldData = data.turf01;
      const newData = oldData.filter((item) => item.id !== id);
      data.turf01 = newData;
    } else if (ground === 2) {
      const oldData = data.turf02;
      const newData = oldData.filter((item) => item.id !== id);
      data.turf02 = newData;
    } else if (ground === 3) {
      const oldData = data.turf03;
      const newData = oldData.filter((item) => item.id !== id);
      data.turf03 = newData;
    }
    setTotalTime((i) => i - 30);
    setTemporaryCart(data);

    console.log("Removed", data);
  };

  const handleOnClick = (index, ground, id) => {
    if (ground === 1) {
      const newData = groundData.turf01;
      if (newData[index].isSelected) {
        removeFromCart(index, ground, id);
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
        removeFromCart(index, ground, id);
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
        removeFromCart(index, ground, id);
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
