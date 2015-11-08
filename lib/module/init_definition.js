Astro.eventManager.on('initDefinition', function (schemaDefinition) {
  var Class = this;

  if (_.has(schemaDefinition, 'relations')) {
    Class.addRelations(schemaDefinition.relations);
  }
});
