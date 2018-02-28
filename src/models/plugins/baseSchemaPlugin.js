module.exports = function baseSchemaPlugin (schema, options) {
  schema.set('toJSON', {versionKey: false});
}