const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const fileSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    _parentFolder: {
        type: Number,
        ref: 'Folder'
    },
    createdDate: {
        type: Date,
        required: true
    },
});

module.exports.File = mongoose.model('File', fileSchema);