var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/sign-in", usersController.getSignUp);
router.post("/sign-in", usersController.postSignUp);

router.get("");

module.exports = router;