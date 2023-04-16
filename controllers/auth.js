const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    const user = await User.create({ email: req.body.register_email, password: req.body.register_password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ success: true, msg: "User Created Successfully!", token });
}

const login = async (req, res) => {
    const { login_email, login_password } = req.body

    if (!login_email || !login_password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ login_email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    // compare password
    const isPasswordCorrect = await user.comparePassword(login_password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ success: true, user: { email: user.email }, token })
}

module.exports = {
    register,
    login,
}
