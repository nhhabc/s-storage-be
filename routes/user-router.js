const express = require('express')
const {signup, login, getUserInf} = require("../service/auth-service");
const {protect} = require("../service/auth-service");
var router = express.Router();

/* Create user */
router.post("/signup", ((req, res) => signup(req, res)));

/* Login */
router.post("/login", ((req, res) => login(req, res)));

router.get("/user", protect, ((req, res) => getUserInf(req, res)));

module.exports = router;