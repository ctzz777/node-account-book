const mongoose = require('mongoose');
const accountTemplateSchema = require('./schemas/accountTemplate');
const Schema = mongoose.Schema;

const Routine = new Schema({
  accountTemplate: {type: accountTemplateSchema, required: true},
  frequency: [{type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}],
});

module.exports = mongoose.model('Routine', Routine, 'Routine');