const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const File = require('./file')

mongoose.Promise = global.Promise;

const folderSchema = new Schema({
    id: {
        type:Number,
        required:true,
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    _parentId: {
        type: Number,
        default:null
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