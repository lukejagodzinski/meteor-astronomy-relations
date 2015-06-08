Package.describe({
  summary: 'Relations for Meteor Astronomy',
  version: '0.1.1',
  name: 'jagi:astronomy-relations',
  git: 'https://github.com/jagi/meteor-astronomy-relations.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@0.10.5');
  api.use('underscore');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles('lib/module/init_module.js', ['client', 'server']);
  api.addFiles('lib/module/init_class.js', ['client', 'server']);
  api.addFiles('lib/module/init_instance.js', ['client', 'server']);
  api.addFiles('lib/module/module.js', ['client', 'server']);
});
