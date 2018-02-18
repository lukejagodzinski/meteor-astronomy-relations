import { Class } from 'meteor/jagi:astronomy';
import _isArray from 'lodash/isArray';
import _has from 'lodash/has';
// Prototype Methods ///////////////////////////////////////////////////////////

var prototypeMethods = {};

prototypeMethods.getRelated = function(relationName) {
  var doc = this;
  var Class = doc.constructor;

  // Look for the relation definition.
  var relation = Class.getRelation(relationName);
  if (!relation) {
    return;
  }
  
  // Get the foreign collection defined in the relation.
  var ForeignClass = Class.get(relation.class);

  // Prepare selector to select only those documents that match the relation.
  var selector = {};
  var localValue = this[relation.local];
  selector[relation.foreign] = _isArray(localValue) ?
    {$in: localValue} : localValue;
    
  // Query the related (Astro-) object(s).
  var related;
  if (relation.type === 'one') {
    related = ForeignClass.findOne(selector);
  } else if (relation.type === 'many') {
    related = ForeignClass.find(selector);
  }
  
  return related;
};


// Class Methods ///////////////////////////////////////////////////////////////

var classMethods = {};

classMethods.hasRelation = function(relationName) {
  return _has(this.schema.relations, relationName);
};

classMethods.getRelation = function(relationName) {
  return this.schema.relations[relationName];
};

classMethods.getRelations = function() {
  return this.schema.relations;
};

export {prototypeMethods, classMethods};