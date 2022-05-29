const {User} = require("../model/user");

exports.getUserInf = async function (req, res) {
    const id = req.user._id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            user
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllUser = async (req, res) => {
    const currentUser = req.user._id
    if (!currentUser) return
    try {
        const users = await User.find({_id: {$ne: currentUser}})
        res.status(200).json({
            users
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateUserInfo = async (req, res) => {
    try {
        const doc = await User.findByIdAndUpdate(req.params.userId, req.body.data, {
            new:true,
            runValidators: true
        })

        res.status(200).json({
            doc
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.updateUserPassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('+password')
        if (!(await user.correctPassword(req.body.data.oldPassword, user.password))) {
            next()
        }
        user.password = req.body.data.newPassword;
        await user.save()
        res.status(200).json({
            message: 'success'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.deleteAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('+password')
        if (!(await user.correctPassword(req.query.password, user.password))) {
            next()
        }
        const doc = await User.findByIdAndDelete(req.user._id)
        res.status(200).json({
            doc
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}
