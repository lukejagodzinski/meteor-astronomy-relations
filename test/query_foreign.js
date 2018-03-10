import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import '../lib/module.js';

Tinytest.add("Relations - Query - Foreign", function(test) {

  const Reference = Class.create({
    name: 'Reference',
    collection: new Mongo.Collection(null),
    secured: false,
  });
  
  const Query = Class.create({
    name: 'Query',
    collection: new Mongo.Collection(null),
    fields: {
      ref: {
        type: String,
        default: ""
      }
    },
    relations: {
      getRef: {
        type: 'one',
        class: Reference,
        foreign: '_id',
        local: 'ref'
      }
    }
  });
  
  var reference = new Reference();
  var query = new Query();
  reference.save();
  query.ref = reference._id;
  test.equal(query.getRef(), reference);
});
