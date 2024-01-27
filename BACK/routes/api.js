const router = require('express').Router();
const {checkToken} = require('../utils/middlewares')

router.use('/projects', checkToken, require('./api/projects'));
router.use('/users', require('./api/users'));






module.exports = router;