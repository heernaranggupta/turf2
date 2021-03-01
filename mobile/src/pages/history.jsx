import React, { useCallback, useContext, useEffect, useState } from "react";
import classnames from "classnames";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../data/context";
import { compareDateWithCurrentDate } from "../utils/compareDateWithCurrentDate";
import api from "../config/api";
import Loading from "../components/loading";
import { tConvert } from "../utils/TimeConverter";
import Header from "../components/header";
import Logo from "../images/logo.png";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import styles from "../css/history.module.css";

const History = () => {
  const history = useHistory();

  const { isLoading, setIsLoading, token } = useContext(Context);

  const [historyList, setHistoryList] = useState([]);
  const [upcoming, setUpComing] = useState([]);
  const [cancelSlots, setCancelSlots] = useState([]);

  const [isUpComingOpen, setIsUpComingOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCancelSlotsOpen, setIsCancelSlotsOpen] = useState(false);

  const HandleDeleteOnClick = (item) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.customUI}>
            <p className="title has-text-white">Are you sure?</p>
            <p>You want to cancel this Slot?</p>
            <p className="subtitle has-text-white">Date: {item.date}</p>
            <p className="subtitle has-text-white">
              Start Time: {item.startTime}
            </p>
            <p className="subtitle has-text-white">End Time: {item.endTime}</p>
            <button className="button" onClick={onClose}>
              No
            </button>
            <button
              className="button is-danger"
              onClick={() => {
                const body = {
                  bookingId: item.bookingId,
                  price: item.price,
                  turfId: item.turfId,
                  userId: item.userId,
                  date: item.date,
                  startTime: item.startTime,
                  endTime: item.endTime,
                };
                axios
                  .post(api + "user/cancel-booking", body, {
                    headers: {
                      "Content-Type": "Application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    console.log(res.data);
                    toast.success("Slot Cancelled");
                    fetchUserData();
                  });
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const fetchUserData = useCallback(() => {
    setIsLoading(true);
    axios
      .get(api + "user/booking-history", {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const bookSlots = res.data?.body?.bookedTimeSlots || [];

        const upComingList = [];
        const historyList = [];
        const cancelledList = [];

        bookSlots.forEach((item) => {
          const data = compareDateWithCurrentDate(item.date);

          if (data) {
            if (
              item.status === "CANCELLED_BY_USER" ||
              item.status === "CANCELLED_BY_BUSINESS"
            ) {
              cancelledList.push(item);
            } else {
              upComingList.push(item);
            }
          } else {
            if (
              item.status === "CANCELLED_BY_USER" ||
              item.status === "CANCELLED_BY_BUSINESS"
            ) {
              cancelledList.push(item);
            } else {
              historyList.push(item);
            }
          }
        });
        setCancelSlots(cancelledList);
        setUpComing(upComingList);
        setHistoryList(historyList);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        toast.error(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, token]);

  const RenderAllComponent = ({
    header,
    list,
    isOpen,
    setIsOpen,
    showDeleteBtn = false,
  }) => {
    if (list.length) {
      return (
        <div className={classnames("box", styles.upcomingGroup)}>
          <div
            className={classnames(
              "is-clickable card-header-title",
              styles.upcomingHeader
            )}
            onClick={() => setIsOpen((old) => !old)}
          >
            <p className="subtitle">{header}</p>
            {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
          </div>
          {isOpen && <hr className="dropdown-divider" />}

          <div className={classnames(styles.upcomingExpandable)}>
            {isOpen ? (
              list.map((item, index) => {
                return (
                  <div
                    className={classnames("mt-6 box", styles.boxStyles)}
                    key={index}
                  >
                    <div>
                      <span className="p-2">{item.date}</span>
                      <div className="tags has-addons" key={index}>
                        <span className="tag is-large">
                          {tConvert(item.startTime)}
                        </span>
                        <span className="tag is-large is-success">
                          <BiRupee />
                          {item.price}
                        </span>
                        {showDeleteBtn ? (
                          <div
                            className="tag is-large is-delete has-background-danger has-text-white is-clickable"
                            onClick={() => HandleDeleteOnClick(item)}
                          ></div>
                        ) : (
                            <span></span>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
                <span></span>
              )}
          </div>
        </div>
      );
    } else {
      return <span></span>;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);
  return (
    <div className="container">
      <div className="columns">
        <div className={classnames("column", styles.FirstColumn)}>
          <div className={classnames(styles.bookingsHeaderIcons)}>
            <BsArrowLeft
              className="is-clickable"
              size={30}
              color="#FFF"
              onClick={() => history.push("/")}
            />
            <div className={classnames(styles.headerlogo)}>
              <img src={Logo} alt="" />
            </div>
            <div>
              <FaWhatsapp
                className="is-clickable mr-3"
                size={30}
                color="#FFF"
                onClick={() => {
                  window.open(
                    "https://api.whatsapp.com/send?phone=919725119988&text=Hi,%20I%20Would%20Like%20to%20Book%20Turf%20Ground%20@Rebounce",
                    "_blank"
                  );
                }}
              />
              <Header />
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
            <div className={classnames("column", styles.SecondColumn)}>
              <RenderAllComponent
                header="Upcoming Bookings"
                list={upcoming}
                isOpen={isUpComingOpen}
                setIsOpen={setIsUpComingOpen}
                showDeleteBtn={true}
              />
              <RenderAllComponent
                header="History Bookings"
                list={historyList}
                isOpen={isHistoryOpen}
                setIsOpen={setIsHistoryOpen}
              />
              <RenderAllComponent
                header="Cancelled Bookings"
                list={cancelSlots}
                isOpen={isCancelSlotsOpen}
                setIsOpen={setIsCancelSlotsOpen}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default History;
