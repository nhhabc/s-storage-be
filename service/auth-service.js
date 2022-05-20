const jwt = require("jsonwebtoken");
const AppError = require('./../util/app-error');
const catchAsync = require('./../util/catchAsync');
const {User} = require("../model/user");

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '90d',
    })
}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })

        const token = signToken(newUser._id)

        res.status(201).json({
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

exports.socialSignup = async (req, res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            username: req.body.email,
            socialType: req.body.socialType
        })

        const token = signToken(newUser._id)

        res.status(201).json({
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

exports.loginSocial = async (req, res, next) => {
    try {
        const {email, socialType} = req.body;

        if (!email || !socialType) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid request body'
            })
            return
        }

        const user = await User.findOne({email});

        //TODO: Check access token

        if (!user) {
            res.status(401).json({
                status: 'fail',
                message: 'Incorrect username or password'
            })
            return
        }

        const token = signToken(user._id);
        res.status(200).json({
            token
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.login = async (req, res, next) => {
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
            token
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.checkUsername = async function (req, res) {
    const username = req.query.u;

    try {
        const user = await User.find({$or: [{username: username}, {email: username}]});

        res.status(200).json({
            isExist: user && user.length > 0 ? true : false
        });
    } catch (err) {
        console.error(err)
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getUserInf = async function (req, res) {
    const id = req.user._id;

    try {
        const user = await User.findById(id);
        console.log(user)

        res.status(200).json({
            user
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
},

    exports.protect = catchAsync(async (req, res, next) => {
        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(
                new AppError('You are not logged in! Please log in to get access.', 401)
            );
        }

        // 2) Verification token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        next();
    });