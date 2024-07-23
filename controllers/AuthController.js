const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const createError = require('../utils/appError');

exports.PostSignup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return next(new createError('user already exits!', 400))
        }

        const hashwedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashwedPassword
        });
        const token = jwt.sign({ _id: newUser._id }, 'pinku2401', { expiresIn: '1h' });

        res.status(201).json({
            status: 'sucess',
            message: 'UserRegistered sucessfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            }
        });
    } catch (error) {
        new (error)
    }
};

exports.PostLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return next(new createError('user Not Found !', 404));
        }
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if (!isPasswordvalid) {
            return next(new createError('Invalid email or Password', 401))
        }
        const token = jwt.sign({ _id: user._id }, 'pinku2401', { expiresIn: '1h' });

        res.status(200).json({
            status: 'Success',
            token,
            message: 'Logged in Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        new (error);
    }
};
