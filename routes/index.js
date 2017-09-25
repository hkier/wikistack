var wiki = require('./wiki');
var user = require('./user');
var express = require ('express');
var router = express.Router();
var models = require('../models')
var Page = models.Page;
var User = models.User;

router.use('/user', user)
router.use('/wiki', wiki)

router.get('/', function (req, res, next){
Page.findAll()
.then(function(list){
    console.log('the list is', list)
    res.render ('index', {list: list})
});
})

module.exports = router
