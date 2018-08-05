const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const path = require('path');

const users = require('./routes/api/users');
const projects = require('./routes/api/projects');

const User = require('./models/User');

const sgMail = require('@sendgrid/mail');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Config
const db = require('./config/keys').mongoURI;

const adwaypassword = require('./config/keys').adwaypassword;
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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

  app.get('*.css', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
  });
  // Set Static Folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

User.findOne({ username: 'adway' }).then(user => {
  if (user) {
    console.log('Already exists');
  } else {
    const newUser = new User({
      username: 'adway'.toLowerCase(),
      password: adwaypassword
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

app.listen(port, () => console.log(`Server running on port ${port}`));
