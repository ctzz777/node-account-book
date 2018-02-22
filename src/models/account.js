const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  description: {type: String, default: ''},
  amount: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Account', Account, 'Account');