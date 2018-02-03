function onInitSchema(schema, className) {
  schema.relations = schema.relations || {};
};

export default onInitSchema;