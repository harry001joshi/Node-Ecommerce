const express = require('express')

const router = express.Router();

const { sendDashboard } = require('../controllers/user.js');
const authenticateUser = require('../middlewares/authentication');

router.route('/').get(authenticateUser, sendDashboard);


module.exports = router;