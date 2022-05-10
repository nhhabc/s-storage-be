var express = require('express');
const {deleteFile} = require("../service/file-service");
const {createFile} = require("../service/file-service");
const {getRootFile} = require("../service/file-service");
const {getAllFile} = require("../service/file-service");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
var router = express.Router();

/* Create file */
router.post("/file", upload.single('file'),((req, res) => createFile(req, res)));

/* GET file. */
router.get('/file/root', ((req, res) => getRootFile(req, res)));

/* GET file. */
router.get('/file/:folderId', ((req, res) => getAllFile(req, res)));

/* Delete file */
router.delete('/file/:fileId', ((req, res) => deleteFile(req, res)));

module.exports = router;