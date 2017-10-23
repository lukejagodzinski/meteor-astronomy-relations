
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
    var Class = this;
    var schema = Class.schema;
    var relationsDefinitions = {};



    if (_.size(relationsDefinitions) > 0) {
      // Add relations to the schema.
      schema.relations = schema.relations || {};
      _.extend(schema.relations, relationsDefinitions);

      var methods = {};
      _.each(relationsDefinitions, function(relationDefinition, relationName) {
        methods[relationName] = function() {
          return this.getRelated(relationName);
        };
      });

      // Add events only if the class has any relations.
      Class.extend({
        events: classEvents,
        methods: methods
      });

      // Add methods to the class prototype if it has any relations.
      _.extend(Astro.BaseClass.prototype, prototypeMethods);

      // Add class methods to the class if it has any relations.
      _.extend(Class, classMethods);
    }
  }
);