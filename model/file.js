const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const fileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
    }    
});

module.exports.File = mongoose.model('File', fileSchema);