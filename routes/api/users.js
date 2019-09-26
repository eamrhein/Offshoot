const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
// const keys = require('../../config/keys');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const valdiateFollowRoot = require('../../validation/followRoot');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

router.patch('/follow_root/:id', (req, res) => {
  const { errors, isValid } = valdiateFollowRoot(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findById(req.body.userId).then((currentUser) => {
    if (!currentUser) {
      return res.status(400).json({ currentUser: "current user id isn't saved to the database " });
    }
    if (currentUser.followedRoots.includes(req.body.rootId)) {
      return res.status(400).json({ root: 'current root is already being followed' });
    }
    currentUser.followedRoots.push(req.body.rootId);
    currentUser.save()
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  });
});

router.delete('/unfollow_root/:id', (req, res) => {
  const { errors, isValid } = valdiateFollowRoot(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findById(req.body.userId).then((currentUser) => {
    if (!currentUser) {
      return res.status(400).json({ currentUser: "current user id isn't saved to the database " });
    }
    if (!currentUser.followedRoots[req.body.json]) {
      return res.status(400).json({ currentUser: 'current user is already unfollowed' });
    }
    currentUser.followedRoots = currentUser.followedRoots.filter()
  });

});

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'A user has already registered with this email' });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (_err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: 'this user does not exist' });
      }
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              followedRoots: user.followedRoots,
              authoredRoots: user.authoredRoots
            };
            jwt.sign(payload,
              process.env.SECRET_OR_KEY,
              { expiresIn: 3600 },
              (_err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({ password: 'Incorrect Password' });
          }
        });
    });
});

module.exports = router;
