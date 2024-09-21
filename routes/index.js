var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET sign up page. */
router.get("/sign-up");

module.exports = router;
