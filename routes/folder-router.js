var express = require('express');
const {getRootFolder} = require("../service/folder-service");
const {deleteFolder} = require("../service/folder-service");
const {createFolder} = require("../service/folder-service");
const {getAllFolder} = require("../service/folder-service");
var router = express.Router();

/* GET folder. */
router.get('/folder', ((req, res) => getAllFolder(req, res)));

/* GET root folder. */
router.get('/folder/root', ((req, res) => getRootFolder(req, res)));

/* Create folder */
router.post("/folder", ((req, res) => createFolder(req, res)));

/* Delete folder */
router.delete('/folder/:courseId', ((req, res) => deleteFolder(req, res)));

module.exports = router;