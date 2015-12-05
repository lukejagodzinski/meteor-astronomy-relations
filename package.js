Package.describe({
  summary: 'Relations for Meteor Astronomy',
  version: '1.0.0',
  name: 'jagi:astronomy-relations',
  git: 'https://github.com/jagi/meteor-astronomy-relations.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@1.2.6');
  api.use('underscore');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles([
    'lib/module/init_definition.js'
  ], ['client', 'server']);
});
