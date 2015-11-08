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

  var mongoSet = e.target._modifiers['$set'];
  if (!mongoSet) {
    return;
  }

  // Check if _references must be reset
  var mustResetReferences = _.any(relations, function(relationDefinition, relationName) {
    // Check if relation.local will be updated on database
    return !!mongoSet[relationDefinition.local];
  }, this);

  if (mustResetReferences) {
    this._references = {};
  }
});
