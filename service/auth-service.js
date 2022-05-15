const User = require('./../model/user')
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({id}, 'secret', {
        expiresIn: '90d',
    })
}

exports.Signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })

        const token = signToken(newUser._id)

        res.status(201).json({
            status: 'success',
            token,
            data: {
                newUser
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'fails',
            message: err
        })
    }
}

exports.Login = async (req, res, next) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid username or password'
            })
            return
        }

        const user = await User.findOne({username}).select('+password')
        const correct = await user.correctPassword(password, user.password);
        console.log(correct)

        if (!user || !correct) {
            res.status(401).json({
                status: 'fail',
                message: 'Incorrect username or password'
            })
            return
        }

        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token
        })
    } catch (err) {
        res.status(404).json({
                status: 'fail',
                message: err
        });
    }
}