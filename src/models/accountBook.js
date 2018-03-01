const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountTemplate = new Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  description: {type: String, default: ''},
  amount: {type: Number, default: 0},
});

const Routine = new Schema({
  accountTemplate: {type: AccountTemplate, required: true},
  frequency: [{type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true}],
});

const AccountBook = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  budget: {type: Number, default: 15000},
  commons: [{type: AccountTemplate, required: true}],
  routines: [{type: Routine, required: true}],
});

module.exports = mongoose.model('AccountBook', AccountBook, 'AccountBook');