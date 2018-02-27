const mongoose = require('mongoose');
const accountTemplateSchema = require('./schemas/accountTemplate');
const Schema = mongoose.Schema;

const AccountBook = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  budget: {type: Number, default: 15000},
  commons: [{type: accountTemplateSchema, required: true}],
  routines: [{type: Schema.Types.ObjectId, ref: 'Routine', required: true}],
});

module.exports = mongoose.model('AccountBook', AccountBook, 'AccountBook');