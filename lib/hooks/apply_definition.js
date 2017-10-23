import {prototypeMethods, classMethods} from '../methods/methods.js';

function onApplyDefinition(Class, parsedDefinition, className) {
  var schema = Class.schema;

  
  if (_.size(parsedDefinition) > 0) {
    // Add relations to the schema.
    schema.relations = schema.relations || {};
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

    // Add methods to the class prototype if it has any relations.
    _.extend(Class.prototype, prototypeMethods);

    // Add class methods to the class if it has any relations.
    _.extend(Class, classMethods);
  }
};

export default onApplyDefinition;