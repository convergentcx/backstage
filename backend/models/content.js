const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    link: {type: String, required: true},
    economy: {type: String, required: true}
});

module.exports = mongoose.model('Content', contentSchema);
