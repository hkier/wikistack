var wiki = require('./wiki');
var user = require('./user');
var express = require ('express');
var router = express.Router();

router.use('/user', user)
router.use('/wiki', wiki)


module.exports = router