const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const Account = new Schema({
  accountBookId: {type: Schema.Types.ObjectId, ref: 'AccountBook', required: true},
  date: {
    type: String,
    validate: {
      validator: function (v) {
        return moment(v, "YYYYMMDD").isValid();
      },
      message: '{VALUE} is not in the valid format: YYYYMMDD'
    }, 
    required: true
  },
  category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
  description: {type: String, default: ''},
  amount: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Account', Account, 'Account');