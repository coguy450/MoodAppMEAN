/**
 * Created by erichartmann on 12/8/14.
 */
var bodyParser = require('body-parser');
var csrf = require('csurf');
var express = require('express');
var session = require('client-sessions');

var middleware = require('../controllers/middleware');

/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user object
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 */
module.exports.createUserSession = function(req, res, user) {

    var cleanUser = {
        firstName:  user.firstName,
        email:      user.email,
        data:       user.data || {}
    };

    req.session.user = cleanUser;
    req.user = cleanUser;
    res.locals.user = cleanUser;
   // res.session.user = cleanUser;
    console.log("session created");
};

/**
 * Create and initialize an Express application that is 'fully loaded' and
 * ready for usage!
 *
 * This will also handle setting up all dependencies (like database
 * connections).
 *
 * @returns {Object} - An Express app object.
 */
module.exports.createApp = function() {

    // middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        cookieName: 'wagonTimeSession',
        secret: 'keyboard cat',
        duration: 30 * 60 * 10000 * 30,
        activeDuration: 5 * 60 * 10000 * 30
    }));
    app.use(csrf());
    app.use(middleware.simpleAuth);

    // routes
    app.use(require('./routes/auth'));
    app.use(require('./routes/main'));

    return app;
};

/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be redirected back to the login page.
 */
module.exports.requireLogin = function(req, res, next) {

   if (!req.session.user) {

        res.redirect('/login');
    } else {
        next();
    }
};