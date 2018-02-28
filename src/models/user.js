const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const AccountBook = require('./accountBook');

const User = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

User.pre('save', function (next) {
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

User.post('save', async function (user) {
  const accountBook = await new AccountBook({
    userId: user._id,
  }).save();
});

User.method('toJSON', function () {
  const user = this.toObject();
  delete user.password;
  return user;
});

User.statics.findByUsernameOrCreate = async function (username) {
  const User = this;
  const exist = await User.findOne({username});
  if(!exist) {
    const password = crypto.randomBytes(128).toString('hex');
    const user = await new User({username, password}).save();
    return user;
  }
  return exist;
};

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