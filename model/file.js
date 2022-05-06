const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const fileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    _parentFolder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    },
    createdDate: {
        type: Date,
        required: true
    },
});

module.exports.File = mongoose.model('File', fileSchema);