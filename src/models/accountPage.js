const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountPage = new Schema({
  accountBookId: {type: Schema.Types.ObjectId, ref: 'AccountBook', required: true},
  date: {type: Date, required: true},
  accounts: [{type: Schema.Types.ObjectId, ref: 'Account', required: true}],
});

module.exports = mongoose.model('AccountPage', AccountPage, 'AccountPage');