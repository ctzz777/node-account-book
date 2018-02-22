const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

User.pre('save', function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
      next();
  }
});

User.method('toJSON', function () {
  const user = this.toObject();
  delete user.password;
  delete user._id;
  delete user.__v;
  return user;
});

User.methods.validatePassword = function (password) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) { 
        return reject(err) ;
      }
      resolve(isMatch);
    });
  });
};

User.methods.generateToken = function () {
  const user = this;
  return jwt.sign({id: user.id}, process.env.JWT_KEY, {expiresIn: process.env.JWT_TIMEOUT});
};

module.exports = mongoose.model('User', User, 'User');