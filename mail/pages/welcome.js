const express = require("express");

const Router = express.Router();

Router.get("", (req, res) => {
  var name = "Ferin Patel";

  res.render("welcome", {
    name,
  });
});

module.exports = Router;
