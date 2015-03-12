/**
 * Created by erichartmann on 12/5/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


module.exports.User = mongoose.model('User', new Schema({
    id:           ObjectId,
    firstName:    { type: String, required: '{PATH} is required.' },
    email:        { type: String, required: '{PATH} is required.', unique: true },
    password:     { type: String, required: '{PATH} is required.' },
    createdOn:    {type: Date, default: Date.now},
    lastLogin:    {type: Date, default: Date.now},
    level:        {type: String},
    data:         Object
}));

module.exports.checkin = mongoose.model('checkin', new Schema({
    type:         {type: Number, required: 'checkin Type is required'},
    userID:       {type: String},
    createdOn:    {type: Date, default: Date.now}
}));

module.exports.feedback = mongoose.model('feedback', new Schema({
    feedbackText:  {type: String, required: 'Feedback is required'},
    userID:       {type: String},
    createdOn:    {type: Date, default: Date.now}
}));

module.exports.allActivities = mongoose.model('allActivities',{
    id:                   ObjectId,
    activityName:         {type: String, required : 'Activity Name is required'},
    description:          {type: String},
    category:             {type: String},
    avgScore:             {type: Number},
    picture:              {type: String},
    createdBy:            {type: String}
});
module.exports.userActivities = mongoose.model('userActivities', new Schema({
    activityName:         {type: String, required: 'Activity Name is required'},
    description:          {type: String},
    parentActivity:       {type: String},
    user:                 {type: String},
    category:             {type: String},
    createdOn:            {type: Date, default: Date.now}
}));

module.exports.activityNotes = mongoose.model('activityNotes', new Schema({
    id:                    ObjectId,
    activity:              {type:String, require: 'Activity ID is required'},
    user:                  {type:String},
    rating:                {type: Number},
    note:                  {type: String},
    createdOn:             {type: Date, default: Date.now},
    share:                 {type: String},
    beforeNotes:           {type: String}
}));
