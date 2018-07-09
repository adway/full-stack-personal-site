const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const projectSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	materials: {
		type: String
	},
	image: {
		type: String
	}
});

const Project = mongoose.model('projects', projectSchema);

module.exports = Project;
