const express = require('express')
const {signup, login, loginSocial, socialSignup, checkUsername, getUserInf} = require("../service/auth-service");
const {protect} = require("../service/auth-service");
var router = express.Router();

/* Create user */
router.post("/signup", ((req, res) => signup(req, res)));

/* Create social user */
router.post("/signup/social", ((req, res) => socialSignup(req, res)));

/* Login Social */
router.post("/login/social", ((req, res) => loginSocial(req, res)));

/* Login */
router.post("/login", ((req, res) => login(req, res)));

/* User check */
router.get("/check/username", ((req, res) => checkUsername(req, res)));

/* Get user's information */
router.get("/user", protect, ((req, res) => getUserInf(req, res)));

module.exports = router;