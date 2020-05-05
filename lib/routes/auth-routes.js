'use strict';

// Esoteric Resources
const express = require('express');
const bcrypt = require('bcrypt');

// Internal Resources
const User = require('../models/users-model.js');
const userSchema = require('../models/users-schema.js');
const auth = require('../middleware/auth.js');

// Variables
const UsersModel = new User(userSchema);
const router = express.Router();

// Routes
router.post('/signup', auth, async (req, res, next) => {
  if (req.user.username && !req.user._id) {
    let user = await UsersModel.create({ ...req.user, ...req.body });
    let token = user.generateToken();
    //let token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(201);
    res.send({ user, token });
    return;
  } else {
    next({ err: 401, msg: 'User already exists' });
  }
});

router.post('/signin', auth, async (req, res, next) => {
  if (req.user._id) {
    res.status(200);
    let token = req.user.generateToken();
    //let token = jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.send({ user: req.user, token: token });
    return;
  } else {
    next({ err: 401, msg: 'User not found' });
  }
});

router.get('/hidden', auth, async (req, res, next) => {
  console.log(req.user);
  if (req.user._id) {
    res.status(200);
    res.send('Secret information that only logged in users can see');
  } else {
    next({ err: 401, msg: 'Not logged in / invalid token' });
  }

  router.get('/users', async (req, res, next) => {
    const allUsers = await UsersModel.schema.find();
    res.status(200).json(allUsers);
  });

  router.get('/user', auth, async (req, res, next) => {
    if (req.user._id) {
      res.status(200);
      let record = UsersModel.schema.read();
      res.send(record);
      return;
    } else {
      next({ err: 401, msg: 'No valid user found' });
    }
  });

});
// Error Handling

// Exports
module.exports = router;
