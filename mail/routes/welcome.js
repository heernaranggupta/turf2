const express = require("express");
const ejs = require("ejs");

const Router = express.Router();

Router.post("", (req, res) => {
  var name = req.body.name || "";
  var email = req.body.email;
  var slots = req.body.slots || [];
  var paymentId = req.body.paymentId || "";

  console.log(req.body);

  try {
    ejs.renderFile(
      __dirname + "/../templates/welcome.ejs",
      { slots: slots, paymentId: paymentId, name },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var mainOptions = {
            from: `"Ferin Patel" somnium_nostri@snproweb.com`,
            to: email,
            subject: "Welcome to Rebounce",
            html: data,
          };

          //console.log("html data ======================>", mainOptions.html);

          req.transporter.sendMail(mainOptions, function (err, info) {
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

module.exports = Router;
