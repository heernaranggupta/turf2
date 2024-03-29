//Express Configuration
var express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var nodemailer = require("nodemailer");
const creds = require("./config/credentail");

const PORT = process.env.PORT || 4000;

const app = express();
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
  next();
});

var router = express.Router();

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

router.post("/send", (req, res, next) => {
  console.log(req.body);

  var name = req.body.name || "";
  var email = req.body.email;
  var slots = req.body.slots || [];
  var paymentId = req.body.paymentId || "";

  try {
    ejs.renderFile(
      __dirname + "/templates/bookings.ejs",
      { slots: slots, paymentId: paymentId, name },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var mainOptions = {
            from: `"Ferin Patel" somnium_nostri@snproweb.com`,
            to: email,
            subject: "Booking Successfull",
            html: data,
          };

          //console.log("html data ======================>", mainOptions.html);

          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err.message);
              res.json({
                message: err.message,
                success: false,
              });
            } else {
              console.log(info);
              res.json({
                message: "",
                success: true,
              });
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

router.post("/show", (req, res) => {
  var name = req.body.name || "";
  var email = req.body.email;
  var slots = req.body.slots || [];
  var paymentId = req.body.paymentId || "";

  res.render("bookings", {
    slots: slots,
    paymentId: paymentId,
    name,
  });
});

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Server is Running",
  });
});

app.use("/api", router);

app.listen(PORT, function () {
  console.log("Server is running at PORT:", PORT);
});
