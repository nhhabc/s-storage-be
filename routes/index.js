var express = require('express');
const {deleteMessage} = require("../service/message-service");
const {createMessage} = require("../service/message-service");
const {getAllMessage} = require("../service/message-service");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({response: "Welcome to my app!"});
});

/* GET messages. */
router.get('/msg', ((req, res) => getAllMessage(req, res)));

/* Create message */
router.post("/msg", ((req, res) => createMessage(req, res)));

/* Delete message */
router.delete('/msg/:courseId', ((req, res) => deleteMessage(req, res)));

module.exports = router;
