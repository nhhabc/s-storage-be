var express = require('express');
const {deleteFile} = require("../service/file-service");
const {createFile} = require("../service/file-service");
const {getAllFile} = require("../service/file-service");
var router = express.Router();

/* GET messages. */
router.get('/folder/:folderId/', ((req, res) => getAllFile(req, res)));

/* Create message */
router.post("/folder/:folerId/", ((req, res) => createFile(req, res)));

/* Delete message */
router.delete('/folder/:folderId/:fileId', ((req, res) => deleteFile(req, res)));

module.exports = router;