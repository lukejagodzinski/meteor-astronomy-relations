Package.describe({
  summary: "Relations for Meteor Astronomy",
  version: "2.0.0",
  name: "jagi:astronomy-relations",
  git: "https://github.com/jagi/meteor-astronomy-relations.git"
});

Package.onUse(function(api) {
  api.versionsFrom("1.3");

  api.use(["jagi:astronomy@2.5.2", "ecmascript"], ["client", "server"]);

  api.mainModule("lib/module.js", ["client", "server"]);
});

Package.onTest(function(api) {
  api.use([
    "tinytest",
    "ecmascript",
    "mongo",
    "jagi:astronomy@2.5.2",
    "jagi:astronomy-relations@2.0.0"
  ]);

  api.addFiles(
    ["test/methods.js", "test/query_one.js", "test/query_many.js", "test/query_foreign.js"],
    ["client", "server"]
  );
});
