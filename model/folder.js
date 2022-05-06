const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const File = require('./file')

mongoose.Promise = global.Promise;

const folderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    _parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    files: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    },
    createdDate: {
        type: Date,
        required: true
    },
});

module.exports.Folder = mongoose.model('Folder', folderSchema);