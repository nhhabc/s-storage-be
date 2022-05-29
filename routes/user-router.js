const express = require('express')
const {deleteAccount} = require("../service/user-service");
const {updateUserPassword} = require("../service/user-service");
const {updateUserInfo} = require("../service/user-service");
const {getAllUser} = require("../service/user-service");
const {getUserInf} = require("../service/user-service");
const {protect} = require("../service/auth-service");
const router = express.Router();

/* Get user's information */
router.get("/user", protect, ((req, res) => getUserInf(req, res)));

/* Get all user */
router.get('/all-user', protect, ((req, res) => getAllUser(req, res)));

/* Update user info */
router.put('/user/:userId', ((req, res) => updateUserInfo(req, res)));

/* Delete account info */
router.delete('/deleteAccount', protect,((req, res) => deleteAccount(req, res)));

/* Update user password */
router.put('/updatePassword', protect,((req, res) => updateUserPassword(req, res)));

module.exports = router;
