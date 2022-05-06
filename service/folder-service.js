const mongoose = require("mongoose");
const {Folder} = require("../model/folder");

module.exports = {
    createFolder: function (req, res) {
        const folder = new Folder({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            createdDate: new Date(),
        });

        folder
            .save()
            .then(() => {
                res.status(201).json({
                    success: true,
                    message: 'New folder created successfully',
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

    getAllFolder: function (req, res) {
        Folder.find()
            .select("_id name createdDate")
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
        Folder.find()
            .where("_parentId").equals(null)
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

    // delete a course
    deleteFolder: function (req, res) {
        const id = req.params.messageId;
        Folder.findByIdAndRemove(id)
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