const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const apiKey = require('../../config/keys').apiKEY;
const bcrypt = require('bcryptjs');
const salt = 12;
const User = require('../../models/User');


// GET ALL USERS
router.get('/', (req, res) => {
  console.log('getting user');
  const promise = User.find({});
  promise.then(users => {
    res.json({ status: true, users });
  });
});

// GET USER BY ID
router.get('/:id', (req, res) => {
  const promise = User.findById({ _id: id });
  promise
    .then(user => {
      res.json({ status: true, user });
    })
    .catch(() => {
      res.json({ status: false, error: 'User not found' });
    });
});

// POST USER REGISTRATION
router.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) res.json({ status: false, err });
    newUser.password = hash;
    newUser.save().then(user => res.json({ status: true, data: user }));
  });
});

// POST USER LOGIN
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      res.json({ status: false, error: 'User not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user._id, email: user.email };

        jwt.sign(payload, apiKey, { expiresIn: 720 }, (err, token) => {
          res.json({ status: true, token: 'Bearer ' + token });
        });
      } else {
        res.status(400).json({ status: false, error: 'Wrong password' });
      }
    });
  });
});

// POST USER AUTHENTICATION
router.post('/authentication', verifyToken, (req, res) => {
  jwt.verify(req.token, apiKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ status: true, data: authData });
    }
  });
});


// VERIFY TOKEN
// FORMAT : Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
