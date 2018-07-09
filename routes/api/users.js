const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User Model
const User = require('../../models/User');

// Validation
const validateLoginInput = require('../../validation/login');

// @route   POST api/users/login
// @desc    Login users route
// @access  Public route
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const username = req.body.username.toLowerCase();
	const password = req.body.password;

	User.findOne({ username }).then(user => {
		if (!user) {
			errors.username = 'User not found';
			return res.status(400).json(errors);
		}

		// Check Password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = { id: user.id };

				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

module.exports = router;
