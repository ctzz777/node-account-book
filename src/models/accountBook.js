const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountBook = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  budget: {type: Number, default: 0},
});

module.exports = mongoose.model('AccountBook', AccountBook, 'AccountBook');