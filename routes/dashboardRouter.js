var express = require("express");
var router = express.Router();

const messageController = require("../controllers/messageController");

/* GET home page. */
router.get("/", messageController.getMessages);
router.post("/", messageController.postMessage);

module.exports = router;
