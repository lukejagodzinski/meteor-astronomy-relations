import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import '../lib/module.js';

Tinytest.add("Relations - Query - One", function(test) {
  
  const Reference = Class.create({
    name: 'Reference',
    collection: new Mongo.Collection(null),
    secured: false,
    fields: {
      ref: {
        type: String,
        default: ""
      }
    }
  });
  
  Reference.extend({
    relations: {
      getRef: {
        type: 'one',
        class: Reference,
        foreign: '_id',
        local: 'ref'
      }
    }
  });
  
  var reference1 = new Reference();
  var reference2 = new Reference();
  reference1.save();
  reference2.ref = reference1._id;
  reference2.save();
  test.equal(reference2.getRef(), reference1);
});
