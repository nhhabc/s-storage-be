const mongoose = require("mongoose");
const fs = require("fs");
const path = require('path')
const {File} = require("../model/file");

module.exports = {
    createFile: function (req, res) {
        const file = new File({
            _id: mongoose.Types.ObjectId(),
            name: req.file.originalname,
            path: req.file.path,
            _parentFolder: req.body.folderId,
            createdDate: new Date()
        });

        console.log(file)

        file
            .save()
            .then(() => {
                res.status(201).json({
                    success: true,
                    message: 'New file created successfully',
                });
            })
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: error.message,
                });
            });
    },

    getAllFile: function (req, res) {
        File.find()
            .select("_id text createdDate")
            .then(file => {
                res.status(200).json({
                    file
                });
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: "Server error. Please try again.",
                    error: err.message
                });
            });
    },

    // delete a course
    deleteFile: function (req, res) {
        const id = req.params.messageId;
        File.findByIdAndRemove(id)
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