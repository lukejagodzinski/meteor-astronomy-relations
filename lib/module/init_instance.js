Astro.eventManager.on('initInstance', function() {
  var doc = this;

  // Object for storing references of related objects.
  doc._references = {};
});
