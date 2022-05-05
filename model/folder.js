const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const folderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true
    },
});

module.exports.Folder = mongoose.model('Folder', folderSchema);