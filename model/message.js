const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const messageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true
    },

    user: {
        type: String,
    },
    _owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    sendTo: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

 module.exports.Message = mongoose.model('Message', messageSchema);