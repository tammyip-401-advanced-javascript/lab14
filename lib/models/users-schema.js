'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('../../docs/role.json');

const rSchema = mongoose.Schema({
  role: {
    type: 'String',
    required: true,
    default: 'user',
    enum: ['admin', 'editor', 'user'],
  },
  capabilities: { required: false },
});

const rModel = mongoose.model('roles', rSchema);

const schema = mongoose.Schema({
  username: { type: 'String', unique: true, required: true },
  password: { type: 'String', required: true },
  email: { type: 'String' },
  role: { type: 'String', required: true, default: 'user', enum: ['admin', 'editor', 'user'] }
});

schema.virtual('roleObj', {
  ref: 'roles',
  localField: 'role',
  foreignField: 'role',
});

schema.pre('save', async function () {
  // hash the password EVERY TIME we try to create a user
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.generateToken = function () {
  let timeout = Date.now() + 5000000;

  //return jwt.sign({ _id: this._id }, process.env.SECRET);

  return jwt.sign(
    { exp: timeout, data: { _id: this._id } },
    process.env.SECRET,
  );
};

schema.methods.comparePasswords = async function (plainTextPass) {
  return await bcrypt.compare(plainTextPass, this.password);
};

schema.methods.hasCapability = function (capability) {
  this.populate('roleObj');
  console.log(this);

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].role === this.role)
      return roles[i].capabilities.includes(capability);
  }

  return false;
};

schema.statics.verifyToken = function (token) {
  let tokenContents = jwt.verify(token, process.env.SECRET);
  return tokenContents.data;
};

schema.statics.read = async function (_id) {
  // "this" >> refers to the model
  let record = await this.findOne({ _id });
  console.log('Found record', record);
  return record;
};

module.exports = mongoose.model('users', schema);