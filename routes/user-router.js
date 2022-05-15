const express = require('express')
const {Signup, Login} = require("../service/auth-service");
var router = express.Router();

/* Create user */
router.post("/signup", ((req, res) => Signup(req, res)));

/* Login */
router.post("/login", ((req, res) => Login(req, res)));

/* GET user. */
router.get('/msg', ((req, res) => getAllMessage(req, res)));

/* Delete user */
router.delete('/msg/:messageId', ((req, res) => deleteMessage(req, res)));

module.exports = router;