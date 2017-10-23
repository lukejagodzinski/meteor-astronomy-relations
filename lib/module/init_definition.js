
// Class Events ////////////////////////////////////////////////////////////////

var classEvents = {};

classEvents.beforeInit = function() {
  var doc = this;

  doc._references = {};
};

classEvents.afterSave = function() {
  this._references = {};
};

// onInitDefinition ////////////////////////////////////////////////////////////

Astro.eventManager.on(
  'initDefinition', function onInitDefinitionRelations(schemaDefinition) {

  }
);