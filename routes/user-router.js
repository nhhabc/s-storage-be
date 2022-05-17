const express = require('express')
const {signup, login} = require("../service/auth-service");
var router = express.Router();

/* Create user */
router.post("/signup", ((req, res) => signup(req, res)));

/* Login */
router.post("/login", ((req, res) => login(req, res)));

module.exports = router;