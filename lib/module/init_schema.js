Astro.eventManager.on('initSchema', function(schemaDefinition) {
  var schema = this;

  // Add the "relations" attribute to the schema.
  schema.relations = schema.relations || {};
});
