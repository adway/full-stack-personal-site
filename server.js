const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const users = require('./routes/api/users');
const projects = require('./routes/api/projects');

const User = require('./models/User');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Config
const db = require('./config/keys').mongoURI;
// Connect to DB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

// USE THE ROUTES
app.use('/api/users', users);
app.use('/api/projects', projects);

User.findOne({ username: 'adway' }).then(user => {
	if (user) {
		console.log('Already exists');
	} else {
		const newUser = new User({
			username: 'adway'.toLowerCase(),
			password: 'thenameisbondjamesbond'
		});

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then(user => console.log(user))
					.catch(err => console.log(err));
			});
		});
	}
});

const port = process.env.port || 5000;

app.listen(5000, () => console.log(`Server running on port ${port}`));
