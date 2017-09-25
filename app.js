'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var chalk = require('chalk');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var app = express()
var path = require('path')
var models = require('./models');
var routes = require('./routes');

app.use(morgan('dev'));

// app.use('/', './routes');


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/',routes)


models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(app.listen(3000, () => {
    console.log(chalk.yellow('listening on port 3000'))
    console.log(chalk.yellow(Date()))
}))
.catch(console.error);



app.get('/', (req, res, next) => {
    console.log('we got here')
    res.sendStatus(200)
})



