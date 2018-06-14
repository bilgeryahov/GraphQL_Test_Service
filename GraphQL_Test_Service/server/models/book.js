const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Do not define the IDs since MongoDB will automatically create them.
const bookSchema = new Schema({
	name: String,
	genre: String,
	authorID: Number
});

module.exports = mongoose.model('Book', bookSchema);