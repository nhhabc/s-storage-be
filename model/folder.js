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
    createdDate: {
        type: Date,
        required: true
    },
});

module.exports.Folder = mongoose.model('Folder', folderSchema);