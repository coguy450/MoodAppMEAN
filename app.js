var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('client-sessions');
var csrf = require('csurf');
var middleware = require('./controllers/middleware');
//connect to mongodb
mongoose.connect('mongodb://demo:Col2nago@ds053320.mongolab.com:53320/standupmeetingnotes');
//mongoose.connect('mongodb://localhost:27017/wagon1');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var swig = require('swig');
// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(session({
    cookieName: 'session',
    secret: 'keyboard cat',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));




// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//from auth project

app.use(csrf());
app.use(middleware.simpleAuth);





// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

app.listen(3000);
module.exports = app;
