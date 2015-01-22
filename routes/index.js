var express = require('express');
var router = express.Router();
var serverCtrl = require('../controllers/server.controller.js');
var utils = require('../controllers/utils');
var bcrypt = require('bcryptjs');
var models = require('../models/model.js');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var middleware = require('../controllers/middleware');


/* GET home page. */
router.get('/', utils.requireLogin, function(req, res) {
    res.render('index', {user: req.user});

});

//example for query
router.post('/', function(req, res){
    return serverCtrl.filterByMember(req, res);
});

router.post('/myActivities',utils.requireLogin, function(req, res){
    if (!req.session.user.email){alert('stop');
    res.redirect('/logout')}
    //console.log(req.session.user.email);

    return serverCtrl.myActivities(req, res);
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
    router.use(session({
        cookieName: 'session',
        secret: 'keyboard cat',
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000
    }));
    router.use(middleware.simpleAuth);
    res.render('login');
});




router.get('/login', function(req, res){
    router.use(session({
        cookieName: 'session',
        secret: 'keyboard cat',
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000
    }));
    router.use(middleware.simpleAuth);
    res.render('login');
});


router.post('/login', function(req, res) {
    models.User.findOne({ email: req.body.email }, 'firstName email password data', function(err, user) {
        if (!user) {
            res.render('login', { error: "Incorrect email / password." });
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                utils.createUserSession(req, res, user);
             //   res.redirect('/');
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
    res.send({success:true});
    entry.save();
});

router.post('/notgood', function(req, res){
    var entry = new models.checkin({
        type:     2,
        userID:   req.session.user.email
    });
    res.send({success:true});
    entry.save();
});

router.post('/bad', function(req, res){
    var entry = new models.checkin({
        type:     1,
        userID:   req.session.user.email
    });
    res.send({success:true});
    entry.save();
});

router.post('/newAct', function(req,res){
    var entry = new models.userActivities({
        activityName:  req.body.activityName,
        description:   req.body.description,
        parentActivity:   req.body.parentActivity,
        user: req.session.user.email
    });
    entry.save();
    res.redirect('/');

});

router.post('/do', function(req,res){
    return serverCtrl.doActivity(req,res);

});

router.post('/myHistory', function(req, res){
    return serverCtrl.myHistory(req, res);
});

router.get('/unrated', function(req,res){
    return serverCtrl.unrated(req,res);
});

router.post('/rate', function(req,res){
    return serverCtrl.rate(req,res);
});

router.post('/note', function(req,res){
   return serverCtrl.note(req,res);
});

router.get('/ratings', function(req,res){
    return serverCtrl.avgRatings(req,res);
});

router.post('/oneRating', function(req,res){
    return serverCtrl.oneRating(req,res);
});

router.post('/getNotes', function(req,res){
    return serverCtrl.getNotes(req,res);
});

module.exports = router;
