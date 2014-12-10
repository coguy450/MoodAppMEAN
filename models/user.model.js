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
    data:         Object
}));