import React, { useContext } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Context } from "../data/context";
// import PaymentSuccessGIF from "../images/payment-successful.gif";
import styles from "../css/PaymentSuccess.module.css";

const PaymentSuccess = () => {
  const { setIsLoggedIn,successBookedData } = useContext(Context);
  console.log("Booked data for table",successBookedData)
//   bookingId: "BF9TE"
// date: "2021-02-18"
// endTime: "09:00:00"
// orderId: "602bac6ce9a5c32987f7c9c1"
// price: 430
// refundId: null
// startTime: "08:30:00"
// status: "BOOKED_BY_USER"
// timestamp: "2021-02-16T16:58:44.971"
// turfId: "turf01"
// userId: "9408806524"
  return (
    <div className={classnames("section", styles.psWrapper)}>
      <div className={classnames("container", styles.psContainer)}>
      <table className="table">
  <thead>
    <tr>
      <th><abbr title="Position">Booking Id</abbr></th>
      <th><abbr title="Goals for">Ground</abbr></th>
      <th><abbr title="Played">Date</abbr></th>
      <th><abbr title="Won">Start Time</abbr></th>
      <th><abbr title="Drawn">End Time</abbr></th>
      <th><abbr title="Lost">Total</abbr></th>
    </tr>
  </thead>
  <tbody>
  {successBookedData &&
            successBookedData.map((item, index) => (
    <tr key={index}>
      <th>{item.bookingId}</th>
      <td>{item.turfId}</td>
      <td>{item.date}</td>
      <td>{item.startTime}</td>
      <td>{item.endTime}</td>
      <td>{item.price}</td>
    </tr>
  ))}
    </tbody>
</table>
        {/* <figure className={classnames("image", styles.imageWrapper)}>
          <img src={PaymentSuccessGIF} alt="Payment Successful" />
        </figure> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <p className="subtitle is-2">Enjoy Your Day</p>
          <div>
            <Link to="/book" className="button is-primary">
              Continue Booking
            </Link>
            <Link to="/profile" className="button is-primary mx-3">
              View Profile
            </Link>
            <button
              onClick={async () => {
                await localStorage.removeItem("turfUserDetails");
                setIsLoggedIn(false);
              }}
              className="button is-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
