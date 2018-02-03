
function onApplyDefinition(Class, parsedDefinition, className) {
  var schema = Class.schema;

  
  if (_.size(parsedDefinition) > 0) {
    // Add relations to the schema.
    _.extend(schema.relations, parsedDefinition);

    var methods = {};
    _.each(parsedDefinition, function(relationDefinition, relationName) {
      methods[relationName] = function() {
        return this.getRelated(relationName);
      };
    });

    // Add events only if the class has any relations.
    Class.extend({
      //events: classEvents,
      helpers: methods
    });

  }
};

export default onApplyDefinition;