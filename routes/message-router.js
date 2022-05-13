var express = require('express');
const {deleteMessage} = require("../service/message-service");
const {createMessage} = require("../service/message-service");
const {getAllMessage} = require("../service/message-service");
var router = express.Router();

/* GET messages. */
router.get('/msg', ((req, res) => getAllMessage(req, res)));

/* Create message */
router.post("/msg", ((req, res) => createMessage(req, res)));

/* Delete message */
router.delete('/msg/:messageId', ((req, res) => deleteMessage(req, res)));

module.exports = router;
