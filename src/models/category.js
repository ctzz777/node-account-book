const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
  name: {type: String, required: true, unique: true},
  icon: {type: String, default: ''}, // semantic-ui icon name
});

module.exports = mongoose.model('Category', Category, 'Category');