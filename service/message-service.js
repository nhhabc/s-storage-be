const mongoose = require("mongoose");
const {Message} = require("../model/message");

module.exports = {
    createMessage: function (req, res) {
        const id = req.user._id

        const message = new Message({
            _id: mongoose.Types.ObjectId(),
            text: req.body.msg,
            createdDate: new Date(),
            _owner: id
        });

        message
            .save()
            .then(() => {
                res.status(201).json({
                    message
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

    getAllMessage: function (req, res) {
        const id = req.user._id

        Message.find({_owner:id})
            .then(messages => {
                res.status(200).json({
                    messages
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
    deleteMessage: function (req, res) {
        const id = req.params.messageId;
        Message.findByIdAndDelete(id)
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