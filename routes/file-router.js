var express = require('express');
const {uploadFile} = require("../service/file-service");
const {deleteFile} = require("../service/file-service");
const {createFile} = require("../service/file-service");
const {getRootFile} = require("../service/file-service");
const {getAllFile} = require("../service/file-service");
const {downloadFile} = require("../service/file-service");
const {protect} = require("../service/auth-service");
var router = express.Router();

/* Create file */
router.post("/file", protect, uploadFile, ((req, res) => createFile(req, res)));

/* GET root file. */
router.get('/file/root', protect, ((req, res) => getRootFile(req, res)));

/* GET file. */
router.get('/file', protect, ((req, res) => getAllFile(req, res)));

/* Download file. */
router.get('/file/:fileId', ((req, res) => downloadFile(req, res)));

/* Delete file */
router.delete('/file/:fileId', ((req, res) => deleteFile(req, res)));

module.exports = router;