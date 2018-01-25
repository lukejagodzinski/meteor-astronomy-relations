import { Class } from 'meteor/jagi:astronomy';

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
  var ForeignCollection = ForeignClass.getCollection();

  // Prepare selector to select only those documents that match the relation.
  var selector = {};
  var localValue = this[relation.local];
  selector[relation.foreign] = _.isArray(localValue) ?
    {$in: localValue} : localValue;

  // Query the related object(s).
  var related;
  if (relation.type === 'one') {
    related = ForeignCollection.findOne(selector);
  } else if (relation.type === 'many') {
    related = ForeignCollection.find(selector);
  }
  
  return related;
};


// Class Methods ///////////////////////////////////////////////////////////////

var classMethods = {};

classMethods.hasRelation = function(relationName) {
  return _.has(this.schema.relations, relationName);
};

classMethods.getRelation = function(relationName) {
  return this.schema.relations[relationName];
};

classMethods.getRelations = function() {
  return this.schema.relations;
};

export {prototypeMethods, classMethods};