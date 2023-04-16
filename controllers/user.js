const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');


const sendDashboard = (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "welcome" });
}

module.exports = {
    sendDashboard
}