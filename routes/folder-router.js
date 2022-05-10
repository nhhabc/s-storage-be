var express = require('express');
const {getRootFolder} = require("../service/folder-service");
const {deleteFolder} = require("../service/folder-service");
const {createFolder} = require("../service/folder-service");
const {getChildFolder} = require("../service/folder-service");
const {getAllFolder} = require("../service/folder-service");
var router = express.Router();

/* GET all folder. */
router.get('/folder', ((req, res) => getAllFolder(req, res)));

/* GET root folder. */
router.get('/folder/root', ((req, res) => getRootFolder(req, res)));

/* GET child folder. */
router.get('/folder/:childId', ((req, res) => getChildFolder(req, res)));

/* Create folder */
router.post("/folder", ((req, res) => createFolder(req, res)));

/* Delete folder */
router.delete('/folder/:folderId', ((req, res) => deleteFolder(req, res)));

module.exports = router;