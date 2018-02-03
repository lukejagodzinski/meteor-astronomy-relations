import _size from 'lodash/size';
import _extend from 'lodash/extend';
import _each from 'lodash/each';


function onApplyDefinition(Class, parsedDefinition, className) {
  var schema = Class.schema;
  
  if (_size(parsedDefinition) > 0) {
      
    // Add relations to the schema.
    _extend(schema.relations, parsedDefinition.relations);
    
    // create helpers-methods
    var methods = {};
    _each(parsedDefinition.relations, (relationDefinition, relationName) => {
      methods[relationName] = function() {
        return this.getRelated(relationName);
      };
    });
    
    // Add events only if the class has any relations.
    
    Class.extend({
      //events: classEvents,
      helpers: methods
    },["helpers"]);
  }
};

export default onApplyDefinition;