import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import '../lib/module.js';

Tinytest.add( "Relations - Query - Many", function(test) {
  
  var Reference = Class.create({
    name: 'Reference',
    collection: new Mongo.Collection(null),
    secured: false,
    fields: {
      refs: {
        type: [String],
        default: ()=>{ return []; }
      }
    },
    relations: {
      getRef: {
        type: 'many',
        class: 'Reference',
        foreign: '_id',
        local: 'refs'
      }
    }
  });
  
  var reference1 = new Reference();
  var reference2 = new Reference();
  var reference3 = new Reference();
  reference2.save();
  reference3.save();
  reference1.refs.push(reference2._id);
  reference1.refs.push(reference3._id);
  reference1.save();
  
  test.equal(reference1.getRef().fetch(), [reference2, reference3]);
});