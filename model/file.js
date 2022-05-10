const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const fileSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
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
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null
    },
    createdDate: {
        type: Date,
        required: true
    },
});

module.exports.File = mongoose.model('File', fileSchema);