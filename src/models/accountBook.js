const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountItem = new Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  description: {type: String, default: ''},
  amount: {type: Number, default: 0},
  rating: {type: Number, default: 0},
});

const Routine = new Schema({
  accountItem: {type: AccountItem, required: true},
  frequency: [{type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true}],
  history: [{type: String, required: true}],
});

const AccountBook = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  budget: {type: Number, default: 15000},
  commons: [{type: AccountItem}],
  routines: [{type: Routine}],
});

module.exports = mongoose.model('AccountBook', AccountBook, 'AccountBook');