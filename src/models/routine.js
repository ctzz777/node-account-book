const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Routine = new Schema({
  accountElement: {type: Schema.Types.ObjectId, ref: 'AccountElement', required: true},
  frequency: [{type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}],
});

module.exports = mongoose.model('Routine', Routine, 'Routine');