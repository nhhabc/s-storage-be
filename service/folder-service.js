const mongoose = require("mongoose");
const {Folder} = require("../model/folder");

module.exports = {
    createFolder: function (req, res) {
        console.log(req.body)

        const folder = new Folder({
            name: req.body.name,
            _parentId: req.body._parentId,
            createdDate: new Date(),
        });

        folder
            .save()
            .then(folder => {
                res.status(201).json({
                    folder,
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

    getChildFolder: function (req, res) {
        Folder.find({_parentId: req.params.childId})
            .then(folder => {
                res.status(200).json({
                    folder
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

    getAllFolder: function (req, res) {
        Folder.find()
            .then(folder => {
                res.status(200).json({
                    folder
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

    getRootFolder: function (req, res) {
        Folder.find({_parentId : null})
            .then(folder => {
                res.status(200).json({
                    folder
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: false,
                    message: "Server error. Please try again.",
                    error: err.message
                });
            });
    },

    // delete a course
    deleteFolder: function (req, res) {
        const id = req.params.folderId;
        Folder.findOneAndDelete(id)
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