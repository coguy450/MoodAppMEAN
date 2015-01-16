var models = require('../models/model.js');


exports.myActivities = function(req, res){
    var query = models.userActivities.find();
    var filter = req.session.user.email;
    query.sort({activityName: 1});
    query.where({user: filter});
    query.exec(function(err, results){
        res.send({
            myActivities:results,
            success:true})
    });
};

exports.myHistory = function(req, res){
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
};

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
    console.log(JSON.stringify(req.body));

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
                console.log(results);
                return res.send({success:true, ratings: results});

            }
        }

    );

}