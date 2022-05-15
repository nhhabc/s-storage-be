const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: true,
    },
    password: {
        type:String,
        require:[true, 'Please enter your password'],
        minLength: 6,
        select:false
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('User', userSchema)
module.exports = User;