const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountElement = new Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  description: {type: String, default: ''},
  amount: {type: Number, default: 0},
});

module.exports = mongoose.model('AccountElement', AccountElement, 'AccountElement');