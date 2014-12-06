var Standup = require('../models/standup.server.model.js'),
    newUser = require('../models/user.model.js');

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
        res.render('index', {title: 'Standup - List', notes: results})

    });

};

exports.create = function(req, res){
    var entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });
entry.save();

    //redirect to home page
    res.redirect(301,'/');
};




exports.newUser = function(req, res){
    var entry = new newUser({
        userName: req.userName,
        password: req.newPassword
    });
    entry.save();
    //redirect to home page
    res.redirect(301,'/');
};

exports.getNote = function(req, res){
    res.render('newnote', {title: 'Standup - New Note'})
};





Standup.find(function(err, results){
    //handle the error

});