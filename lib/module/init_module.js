var methods = {};

methods.setRelated = function(relationName, value) {};

methods.getRelated = function(relationName) {
  var doc = this;
  var Class = doc.constructor;

  // If there is already a reference to the relation object(s) stored in the
  // "_references" object then we can take it without looking in collection.
  if (_.has(this._references, relationName)) {
    return this._references[relationName];
  }

  // Look for the relation definition.
  var relation = Class.getRelation(relationName);
  if (!relation) {
    return;
  }

  // Get a collection defined in the relation.
  var ForeignClass = Astro.classes[relation.class];
  var ForeignCollection = ForeignClass.getCollection();

  // Prepare selector to select only these documents that much the relation.
  var selector = {};
  selector[relation.foreign] = this.get(relation.local);

  // Get a related object.
  var related;
  if (relation.type === 'one') {
    related = ForeignCollection.findOne(selector);
  } else if (relation.type === 'many') {
    related = ForeignCollection.find(selector);
  }

  // Assing the related object to the "_references" object for further use.
  return this._references[relationName] = related;
};

_.extend(Astro.BaseClass.prototype, methods);
