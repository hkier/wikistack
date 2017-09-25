var express = require('express');
var router = express.Router();
var models = require('../models');
var chalk = require('chalk')
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
    // /wiki/get route
    res.redirect('/')
})

router.get('/add', function (req, res, next) {
    // /wiki/add route
    res.render('../views/addpage.html')

})

router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({ where: { urlTitle: req.params.urlTitle } })
        .then(function (found) {
            res.render('../views/wikipage.html', { found: found })
        })
        .catch(function (err) {
            console.log(err);
        });
});


router.post('/', function (req, res, next) {
    // /wiki/post route
    var user = User.findOrCreate({
        where: {
            name: req.body.author,
            email: req.body.email
        }
    })
        .then(function (vals) {
            var user = vals[0];

            var page = Page.build({
                title: req.body.title,
                content: req.body.content
            });

            page.save()
                .then(page => {
                    return page.setAuthor(user)
                })
                .then(obj => {
                    console.log(chalk.magenta(obj))
                    res.redirect('/wiki/' + obj.urlTitle)
                })
        })
        .catch(function (err) { console.log(err) })
})




module.exports = router