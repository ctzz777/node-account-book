const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Routine = new Schema({
  accountTemplate: {type: Schema.Types.ObjectId, ref: 'AccountTemplate', required: true},
  frequency: [{type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}],
});

module.exports = mongoose.model('Routine', Routine, 'Routine');