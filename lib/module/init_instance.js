Astro.eventManager.on('beforeInit', function() {
  var doc = this;

  // Object for storing references of related objects.
  doc._references = {};
});

// Reset _references object if object is saved
Astro.eventManager.on('afterSave', function(e) {
  var relations = this.constructor.getRelations();
  if (!relations) {
    return;
  }

  var modifiersList = ['$set', '$push', '$pop', '$pullAll', '$inc'];
  var modifiers = _.reduce(modifiersList, function (memo, modifierName) {
    var modifier = e.target._modifiers[modifierName];
    if (!modifier) {
      return memo;
    }
    return _.extend(memo, modifier);
  }, []);

  // Check if _references must be reset
  var mustResetReferences = _.any(relations, function(relationDefinition, relationName) {
    // Check if relation.local will be updated on database
    return !!modifiers[relationDefinition.local];
  }, this);

  if (mustResetReferences) {
    this._references = {};
  }
});
