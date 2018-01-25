const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountBook = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  budget: {type: Number, default: 15000},
  commons: [{type: Schema.Types.ObjectId, ref: 'AccountElement', required: true}],
  routines: [{type: Schema.Types.ObjectId, ref: 'Routine', required: true}],
});

AccountBook.method('toJSON', function () {
  const accountBook = this.toObject();
  delete accountBook.userId;
  delete accountBook.__v;
  return accountBook;
});

module.exports = mongoose.model('AccountBook', AccountBook, 'AccountBook');