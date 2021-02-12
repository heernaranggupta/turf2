const express = require("express");

const Router = express.Router();

Router.get("", (req, res) => {
  var name = req.body.name || "";
  var email = req.body.email;
  var slots = [
    {
      bookingId: "L7ZJN",
      userId: "123456789876543",
      turfId: "turf01",
      price: 530.0,
      status: "BOOKED_BY_USER",
      date: "2021-02-12",
      startTime: "17:00:00",
      endTime: "17:30:00",
      orderId: "60264fc5e222a857924829c3",
      refundId: null,
      timestamp: "2021-02-12T15:22:05.645",
    },
    {
      bookingId: "MMGS7",
      userId: "123456789876543",
      turfId: "turf01",
      price: 530.0,
      status: "BOOKED_BY_USER",
      date: "2021-02-12",
      startTime: "19:00:00",
      endTime: "19:30:00",
      orderId: "60264fc5e222a857924829c3",
      refundId: null,
      timestamp: "2021-02-12T15:22:05.652",
    },
    {
      bookingId: "EDJ1O",
      userId: "123456789876543",
      turfId: "turf01",
      price: 530.0,
      status: "BOOKED_BY_USER",
      date: "2021-02-12",
      startTime: "18:00:00",
      endTime: "18:30:00",
      orderId: "60264fc5e222a857924829c3",
      refundId: null,
      timestamp: "2021-02-12T15:22:05.668",
    },
    {
      bookingId: "TXCNI",
      userId: "123456789876543",
      turfId: "turf01",
      price: 530.0,
      status: "BOOKED_BY_USER",
      date: "2021-02-12",
      startTime: "16:30:00",
      endTime: "17:00:00",
      orderId: "60264fc5e222a857924829c3",
      refundId: null,
      timestamp: "2021-02-12T15:22:05.675",
    },
  ];
  var paymentId = req.body.paymentId || "";

  res.render("bookings", {
    slots: slots,
    paymentId: paymentId,
    name,
  });
});

module.exports = Router;
