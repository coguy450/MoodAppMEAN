var express = require('express');
var router = express.Router();
var standupCtrl = require('../controllers/standup.server.controller');
var utils = require('../controllers/utils');
var bcrypt = require('bcryptjs');
var models = require('../models/model.js');
var session = require('client-sessions');


/* GET home page. */

router.get('/', utils.requireLogin, function(req, res) {
    res.render('index', {user: req.user});
});

//example for query
router.post('/', function(req, res){
    return standupCtrl.filterByMember(req, res);
});

router.get('/register', function(req, res){
    res.render('register', {
        title: 'Register'

    })
});


router.post('/register', function(req, res){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var entry = new models.User({
        firstName: req.body.firstname,
        email: req.body.email,
        password: hash
    });
    entry.save();
    res.redirect(301,'/');

});




router.get('/login', function(req, res){
    router.use(session({
        cookieName: 'session',
        secret: 'keyboard cat',
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000
    }));
    res.render('login');
});


router.post('/login', function(req, res) {
    models.User.findOne({ email: req.body.email }, 'firstName email password data', function(err, user) {
        if (!user) {
            res.render('login', { error: "Incorrect email / password." });
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                utils.createUserSession(req, res, user);
                res.render('index',{user: user});
            } else {
                res.render('login', { error: "Incorrect email / password."  });
            }
        }
    });
});
/*Log a user out of their account, then redirect them to the home page. */
router.get('/logout', function(req, res) {
    if (req.session) {
        req.session.reset();
    }
    res.redirect('/');
});


router.post('/great', function(req, res){
    var entry = new models.checkin({
        type:     5,
        userID:   req.session.user.email
    });
    res.send({success:true});
    entry.save();

});

router.post('/ok', function(req, res){
    var entry = new models.checkin({
        type:     3,
        userID:   req.session.user.email
    });

    entry.save();
});

router.post('/notgood', function(req, res){
    var entry = new models.checkin({
        type:     2,
        userID:   req.session.userID
    });
    entry.save();
});

router.post('/bad', function(req, res){
    var entry = new models.checkin({
        type:     1,
        userID:   req.session.userID
    });
    entry.save();
});

module.exports = router;
