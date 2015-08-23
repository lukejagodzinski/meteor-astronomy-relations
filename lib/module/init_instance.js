Astro.eventManager.on('beforeInit', function() {
  var doc = this;

  // Object for storing references of related objects.
  doc._references = {};
});
