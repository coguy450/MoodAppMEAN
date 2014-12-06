/**
 * Created by erichartmann on 12/5/14.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    userName: String,
    password: String,
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('newUser',userSchema);