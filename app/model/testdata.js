
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Testdata', new Schema({
    name: String,
    description: String,
    created_date: Date
}));

