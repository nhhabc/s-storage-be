const fs = require("fs");
const {File} = require("../model/file");
const path = require('path');
const mime = require('mime');

module.exports = {
    createFile: async function (req, res) {
        try {
            console.log(req.body.folderId)
            // const newTour = new Tour({})
            // newTour.save()        
            const file = await File.create({
                name: req.file.originalname,
                path: req.file.path,
                _parentFolder: req.body.folderId,
                createdDate: new Date()
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
        try {
            const file = await File.find({_parentFolder: req.query.folderId});

            res.status(200).json({
                status: 'success',
                data: {
                    file
                }
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
            const file = await File.find({_parentFolder: null});

            res.status(200).json({
                status: 'success',
                data: {
                    file
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    },

    // delete a course
    deleteFile: function (req, res) {
        const id = req.params.fileId;
        File.findById(id)
            .then(req => {
                console.log(req)
                const path = req.path;
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            })
        File.findOneAndDelete(id)
            .exec()
            .then(() =>
                res.status(204).json({
                    success: true
                })
            )
            .catch(err =>
                res.status(500).json({
                    success: false
                })
            );

    }
}