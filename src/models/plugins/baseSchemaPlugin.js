module.exports = function baseSchemaPlugin (schema, options) {
  schema.add({
    __v: {type: Number, select: false},
  });
}