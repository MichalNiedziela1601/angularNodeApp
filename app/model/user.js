var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    login: String,
    email: String,
    password: String,
    admin: Boolean
}));
