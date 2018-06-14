const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Do not define the IDs since MongoDB will automatically create them.
const authorSchema = new Schema({
	name: String,
	age: Number
});

module.exports = mongoose.model('Author', authorSchema);