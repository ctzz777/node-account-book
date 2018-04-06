const mongoose = require('mongoose');

mongoose.plugin(require('./plugins/baseSchemaPlugin'));
mongoose.connect(process.env.DB_URI, { useMongoClient: true, connectTimeoutMS: 3000 });
mongoose.Promise = global.Promise;

exports.mongoose = mongoose;