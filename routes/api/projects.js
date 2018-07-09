const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Project Model
const Project = require('../../models/Project');

// Load validation
const validateProjectInput = require('../../validation/project');

// @route   GET api/projects
// @desc    GET all projects
// @access  Public route
router.get('/', (req, res) => {
	Project.find()
		.sort({ date: -1 })
		.then(projects => res.json(projects))
		.catch(err =>
			res.status(400).json({ noprojectsfound: 'There were no projects found' })
		);
});

// @route   GET api/projects/:id
// @desc    GET project by ID
// @access  Public route
router.get('/:id', (req, res) => {
	Project.findById(req.params.id)
		.then(project => res.json(project))
		.catch(err =>
			res
				.status(404)
				.json({ noprojectfound: 'There was no project found with this ID' })
		);
});

// @route   POST api/projects/
// @desc    Create project
// @access  Private route
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProjectInput(req.body);

		// Check the validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newProject = new Project({
			title: req.body.title,
			description: req.body.description,
			materials: req.body.materials,
			image: req.body.image,
			date: req.body.date
		});

		newProject.save().then(project => res.json(project));
	}
);

// @route   PUT api/projects/:id
// @desc    Update project
// @access  Private route
router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProjectInput(req.body);

		// Check the validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const updatedProject = {
			title: req.body.title,
			description: req.body.description,
			materials: req.body.materials,
			image: req.body.image,
			date: req.body.date
		};

		Project.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: updatedProject },
			{ new: true }
		)
			.then(project => res.json(project))
			.catch(err =>
				res.status(400).json({
					projectnotupdated: 'Something went wrong updating the project'
				})
			);
	}
);

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Project.findOneAndRemove({ _id: req.params.id }).then(() =>
			Project.find().then(projects => res.json(projects))
		);
	}
);

module.exports = router;
