const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../../middleware/token');
const User = require('../../models/User');
const salt = 12;
const apiKey = require('../../config/keys').apiKEY;

// [GET] Fetch users from database
router.get('/', (req, res) => {
  const promise = User.find({});
  promise.then(users => {
    users.length > 0
      ? res.json({ success: true, data: users })
      : res.json({ success: false, message: 'Hiçbir Kullanıcı Bulunamadı' });
  });
});

// [GET] Fetch user by id
router.get('/:id', (req, res) => {
  const promise = User.findById({ _id: req.params.id });
  promise
    .then(user => {
      res.json({ success: true, data: user });
    })
    .catch(() => {
      res.json({
        success: false,
        message: 'Bu IDye sahip kullanıcı bulunamadı',
      });
    });
});

// [DELETE] Delete user by id
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user =>
      user
        .remove()
        .then(() => res.json({ success: true, message: 'Başarıyla Silindi' }))
    )
    .catch(() => res.status(404).json({ success: false }));
});

// [POST] New user registration / add
router.post('/register', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) res.json({ success: false });
    newUser.password = hash;
    newUser
      .save()
      .then(user => res.json({ success: true, data: user }))
      .catch(() => {
        res.json({ success: false, message: 'Kullanıcı zaten kayıtlı' });
      });
  });
});

// [POST] User login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      res.json({ success: false, message: 'Kullanıcı Bulunamadı' });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user._id, email: user.email };
        jwt.sign(payload, apiKey, { expiresIn: '1h' }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
            message: 'Giriş başarılı.. Yönlendiriliyorsunuz.',
          });
        });
      } else {
        res.json({ success: false, message: 'Hatalı Şifre' });
      }
    });
  });
});

// [POST] User authentication by JWT Bearer token
router.post('/authentication', verifyToken, (req, res) => {
  jwt.verify(req.token, apiKey, (err, authData) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ success: true, data: authData });
    }
  });
});

module.exports = router;
