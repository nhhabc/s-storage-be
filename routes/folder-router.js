var express = require('express');
const {deleteFolder} = require("../service/folder-service");
const {createFolder} = require("../service/folder-service");
const {getAllFolder} = require("../service/folder-service");
var router = express.Router();

/* GET messages. */
router.get('/folder', ((req, res) => getAllFolder(req, res)));

/* Create message */
router.post("/folder", ((req, res) => createFolder(req, res)));

/* Delete message */
router.delete('/folder/:courseId', ((req, res) => deleteFolder(req, res)));

module.exports = router;