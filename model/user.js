const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SocialType = require('./constant/social-type')

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: true,
    },
    socialType: {
        type: [Object.keys(SocialType)],
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        require: false,
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

module.exports.User = mongoose.model('User', userSchema);