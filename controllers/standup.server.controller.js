var Standup = require('../models/standup.server.model'),
    models = require('../models/model.js');



exports.list = function(req, res){
    var query = Standup.find();
    query.sort({createdOn: 'desc'})
        .limit(12)
        .exec(function(err, results){
            res.render('index', {title: 'Standup - List', notes: results});
        });
};

exports.filterByMember = function(req, res){
    var query = Standup.find();
    var filter = req.body.memberName;
    query.sort({createdOn: 'desc'});
    if (filter.length > 0){
        query.where({memberName: filter})
    }
    query.exec(function(err, results){
        res.send({myActivities:results})
    });

};

exports.myActivities = function(req, res){
    var query = models.userActivities.find();
    var filter = req.session.user.email;
    query.sort({createdOn: 'desc'});
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
exports.login = function(req, res){

};



exports.getNote = function(req, res){
    res.render('newnote', {title: 'Standup - New Note'})
};

