var models = require('../models/model.js');


exports.myActivities = function(req, res){
    if (!req.session.user.email){res.redirect(301,'/logout');} else {
    var query = models.userActivities.find();
    var filter = req.session.user.email;
    query.sort({activityName: 1});
    query.where({user: filter});
    query.exec(function(err, results){
        res.send({
            myActivities:results,
            success:true})
    });
}};

exports.myHistory = function(req, res){
    console.log(req.session.user.email);
    if (req.session.user.email == undefined){
        console.log('danger will robinson');
        res.redirect(301,'/logout');} else {
    var query = models.checkin.find();
    var filter = req.session.user.email;
    query.sort({createdOn: 'desc'});
    query.limit(25);
    query.where({userID: filter});
    query.exec(function(err, results){
        res.send({
            myHistory:results,
            success:true})
    });
    }};

exports.newUserRegister = function(req, res){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    var entry = new models.User({
        firstName: req.body.firstname,
        email: req.body.email,
        password: hash
    });
    entry.save();
    res.redirect(301,'/');

};

exports.doActivity = function(req,res){
    var entry = new models.activityNotes({
        activity:  req.body.activity,
        user: req.session.user.email
    });
    entry.save();
    res.send({success:true});
  //res.redirect('/')
};


exports.unrated = function(req, res){
    var query = models.activityNotes.find();
    var filter = req.session.user.email;
    query.sort({createdOn: 'desc'});
    query.where({user: filter, rating: null });
    query.exec(function(err, results){
        res.send({
            myUnrated:results,
            success:true})
    });
};

exports.feedback = function(req,res){
    var entry = new models.feedback({
        feedbackText:  req.body.feedback,
        user: req.session.user.email
    });
    console.log(req.body);
    entry.save();
    res.send({success:true});
    //res.redirect('/')
};

exports.rate = function(req, res){
    var query = {_id: req.body.activity};
    models.activityNotes.findOneAndUpdate(query, {rating: req.body.rating}, function(err,doc){
        if (err) return res.send(500, { error: err });
        return res.send({success:true});
    });
};

exports.note = function(req, res){
    var query = {_id: req.body.activity};
    models.activityNotes.findOneAndUpdate(query, {note: req.body.note}, function(err,doc){
        if (err) return res.send(500, { error: err });
        return res.send({success:true});

    });
};

exports.avgRatings = function(req,res){
    var filter = req.session.user.email;
    models.activityNotes
        .aggregate([
            { $match: {user: filter}},
           { $group: {
                _id: '$activity',
                Avg: { $avg: '$rating'}
            }}
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                return res.send({success:true, ratings: results});
            }
        }
    );
};

exports.oneRating  = function(req,res){
    var user = req.session.user.email;
    var filter = req.body.activity;
    models.activityNotes
        .aggregate([
            { $match: {user: user, activity: filter}},
            { $group: {
                _id: '$activity',
                Avg: { $avg: '$rating'}
            }}
        ], function (err, results) {
            if (err) {
                console.error(err);
            } else {
                return res.send({success:true, ratings: results});
            }
        }
    );
};

exports.getNotes = function(req,res){
    var query = models.activityNotes.find();
    var filter = req.session.user.email;
    var activity = req.body.activity;
    query.sort({createdOn: 'desc'});
    query.where({user: filter, activity: activity });
    query.exec(function(err, results){
        res.send({
            notes:results,
            success:true});
    });
};

exports.dailyScore = function(req,res){
    var query = models.activityNotes.find() ;
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate()-1);
    var filter = req.session.user.email;
    query.where({user: filter, createdOn: {$gt:todayDate} });
    query.exec(function(err, results){
        res.send({
            dailyScore:results,
            success:true});
        console.log(results)
    });
};

