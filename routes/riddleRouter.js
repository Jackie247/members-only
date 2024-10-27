var express = require("express");
var router = express.Router();

const riddleController = require("../controllers/riddleController");

router.get("/", riddleController.getRiddle);
router.get("/riddle/:question", riddleController.getQuizStart);
router.post("/riddle/:question", riddleController.postRiddleAnswer);

module.exports = router;
