const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountTemplate = new Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  description: {type: String, default: ''},
  amount: {type: Number, default: 0},
});

module.exports = AccountTemplate;