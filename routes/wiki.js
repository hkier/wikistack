var express = require ('express');
var router = express.Router();
var models = require('../models');
var chalk = require('chalk')
var Page = models.Page; 
var User = models.User; 

router.get('/', function (req, res, next){
    // /wiki/get route
    res.redirect('/')
})

router.get('/add', function (req, res, next){
    // /wiki/add route
    res.render('../views/addpage.html')
})

router.post('/', function (req, res, next){
    // /wiki/post route

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
  .then(obj =>{
      console.log(chalk.magenta(obj))
     res.json(obj)
  })
})




module.exports = router