const mongoose = require("mongoose");
const {Message} = require("../model/message");

module.exports = {
    createMessage: function (req, res) {
        const id = req.user._id

        const message = new Message({
            _id: mongoose.Types.ObjectId(),
            text: req.body.msg,
            createdDate: new Date(),
            user: req.user.username,
            _owner: id,
            sendTo: req.body.sendTo,
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
        const currentUser = req.user._id;
        const friendUser = req.query.user

        Message.find({$or: [{_owner: currentUser, sendTo: friendUser}, {_owner: friendUser, sendTo: currentUser}]})
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