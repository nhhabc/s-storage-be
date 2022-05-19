const fs = require("fs");
const multer = require('multer')
const {File} = require("../model/file");
const path = require('path');
const mime = require('mime');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
    }
});

const upload = multer({
    storage:multerStorage
})

module.exports = {
    uploadFile: upload.single('file'),

    createFile: async function (req, res) {
        const id = req.user._id;
        console.log(req.file)

        try {
            // const newTour = new Tour({})
            // newTour.save()        
            const file = await File.create({
                name: req.file.originalname,
                path: req.file.path,
                _parentFolder: req.body.folderId,
                createdDate: new Date(),
                _owner: id
            });
            res.status(201).json({
                file
            });
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
    },

    getAllFile: async function (req, res) {
        const id = req.user._id;

        try {
            const file = await File.find({_parentFolder: req.query.folderId, _owner: id});

            res.status(200).json({
                file
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    },

    downloadFile: async function (req, res) {
        const id = req.params.fileId;
        try {
            const file = await File.findById(id);
            const filePath = file.path;

            const filename = path.basename(filePath);
            const mimetype = mime.lookup(filePath);

            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            res.download(filePath)
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    },

    getRootFile: async function (req, res) {
        try {
            const id = req.user._id;
            const file = await File.find({_parentFolder: null, _owner: id});

            res.status(200).json({
                file
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    },

    // delete a course
    deleteFile: async function (req, res) {
        try {
            const id = req.params.fileId;

            const file = await File.findById(id);
            const filePath = file.path;

            const deleteFile = await File.findOneAndDelete({_id: id});
            await fs.rm(filePath, (err) => {
                console.log(err)
            });

            res.status(200).json({
                status: 'success',
                data: {
                    deleteFile
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    }
}