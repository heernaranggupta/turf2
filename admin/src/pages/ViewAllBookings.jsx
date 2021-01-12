import React, { useContext, useCallback, useEffect, useState } from "react";
import { Context } from "../data/context";
import api from "../config/api";
import headerWithToken from "../config/headerWithToken";
import axios from "axios";
import { toast } from "react-toastify";

const ViewAllBookings = () => {
  const {viewAllBookingList,setviewAllBookingList} = useContext(Context);

  // const [viewAllBookingList, setviewAllBookingList] = useState([]);
  const [status, setStatus] = useState("BOOKED_BY_USER");
  const [toDate, setToDate] = useState( new Date().toISOString().slice(0, 10));
  const [fromDate, setFromDate] = useState( new Date().toISOString().slice(0, 10));

  const getAllBookings = useCallback(() => {
    const postData = {
      userId: "",
      status: status,
      fromDate: fromDate,
      toDate: toDate,
    };
    console.log("body",postData)
    axios
      .post(api + "business/view-all-bookings", postData, headerWithToken)
      .then((res) => {
        console.log("Get All Slots by Date ", res.data.body);
        setviewAllBookingList(res.data.body);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    getAllBookings();
  }, [getAllBookings]);

  return (
    <div>
      View All Booking
      <div className="field">
        <div className="control">
          <div className="select is-info">
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value={"BOOKED_BY_USER"}>Booked By User</option>
              <option value={"BOOKED_BY_BUSINESS"}>booked by Business</option>
              <option value={"CANCELLED_BY_USER"}>Cancel by User</option>
              <option value={"CANCELLED_BY_BUSINESS"}>Cancel by Business</option>
              <option value={"RESCHEDULED_BY_USER"}>Reshedule by User</option>
              <option value={"RESCHEDULED_BY_BUSINESS"}>Reshedule by Business</option>
              <option value={"AVAILABLE"}>Available</option>
              <option value={"NOT_AVAILABLE"}>Not Available</option>
            </select>
          </div>
        </div>
        <div>To Date</div>
        <input
          className="input"
          type="date"
          placeholder="Pick Date"
          value={toDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(event) => {
            setToDate(event.target.value);
          }}
        />
        <div>From Date</div>
        <input
          className="input"
          type="date"
          placeholder="Pick Date"
          value={fromDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(event) => {
            setFromDate(event.target.value);
          }}
        />
        <div className="table-container">
          <table className="table is-fullwidth">
            <th>Mobile</th>
            <th>BookingId</th>
            <th>Date</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Turf Number</th>
            <th>Action</th>
            <tbody>
              {viewAllBookingList
                ? viewAllBookingList.map((list, index) => (
                    <tr key={index}>
                      <td>{list.userId}</td>
                      <td>{list.bookingId}</td>
                      <td>{list.date}</td>
                      <td>{list.startTime}</td>
                      <td>{list.endTime}</td>
                      <td>
                        {list.turfId === "turf01" ? "Ground 1" : <span></span>}
                        {list.turfId === "turf02" ? "Ground 2" : <span></span>}
                        {list.turfId === "turf03" ? "Ground 3" : <span></span>}
                      </td>
                      <td>
                          <tr>Cancel</tr>
                          <tr>Reshedule</tr>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ViewAllBookings;
