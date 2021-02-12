const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

const creds = require("./config/credentail");

const bookings = require("./routes/bookings");
const showBookings = require("./pages/bookings");

const welcome = require("./routes/welcome");
const showWelcome = require("./pages/welcome");

const PORT = process.env.PORT || 4000;
const app = express();

var transport = {
  host: creds.SMTP,
  port: creds.PORT,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

app.use(bodyParser.json());
app.set("views", "./templates");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  req.transporter = transporter;
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: "1",
    message: "API IS WORKING",
  });
});

app.use("/mail/bookings", bookings);
app.use("/show/bookings", showBookings);

app.use("/mail/welcome", welcome);
app.use("/show/welcome", showWelcome);

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
