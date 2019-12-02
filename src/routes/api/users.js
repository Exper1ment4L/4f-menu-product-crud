const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const apiKey = require('../../config/keys').apiKEY;
const bcrypt = require('bcryptjs');
const salt = 12;
const User = require('../../models/User');

// GET ALL USERS
router.get('/', (req, res) => {
  const promise = User.find({});
  promise.then(users => {
    res.json({ success: true, data: users });
  });
});

// GET USER BY ID
router.get('/:id', (req, res) => {
  const promise = User.findById({ _id: req.params.id });
  promise
    .then(user => {
      res.json({ success: true, data: user });
    })
    .catch(() => {
      res.json({ success: false, error: 'User not found' });
    });
});

// POST USER REGISTRATION
router.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) res.json({ success: false });
    newUser.password = hash;
    newUser.save().then(user => res.json({ success: true, data: user }));
  });
});

// POST USER LOGIN
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      res.json({ success: false, error: 'User not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user._id, email: user.email };

        jwt.sign(payload, apiKey, { expiresIn: 720 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        res.success(400).json({ success: false, error: 'Wrong password' });
      }
    });
  });
});

// POST USER AUTHENTICATION
router.post('/authentication', verifyToken, (req, res) => {
  jwt.verify(req.token, apiKey, (err, authData) => {
    if (err) {
      res.sendsuccess(403);
    } else {
      res.json({ success: true, data: authData });
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
    res.sendsuccess(403);
  }
}

module.exports = router;
