var express = require('express');
const {deleteMessage} = require("../service/message-service");
const {createMessage} = require("../service/message-service");
const {getAllMessage} = require("../service/message-service");
const {protect} = require("../service/auth-service");
var router = express.Router();

/* Create message */
router.post("/msg", protect,((req, res) => createMessage(req, res)));

/* GET messages. */
router.get("/msg", protect,((req, res) => getAllMessage(req, res)));

/* Delete message */
router.delete('/msg/:messageId', ((req, res) => deleteMessage(req, res)));

module.exports = router;
