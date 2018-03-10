import { Class } from 'meteor/jagi:astronomy';
import { Mongo } from 'meteor/mongo';
import '../lib/module.js';

Tinytest.add("Relations - Methods", function(test) {
  
  const RelationClass = Class.create({
    name: 'Relation',
    fields: {
      ref: {
        type: String,
        default: ""
      }
    }
  });
  
  RelationClass.extend({
    relations: {
      getRef: {
        type: 'one',
        class: RelationClass,
        foreign: '_id',
        local: 'ref'
      }
    }
  });
  
  var relation = new RelationClass();
  
  // prototype methods
  test.equal(typeof(relation.getRelated), 'function', 'Relation class prototype does not implement "getRelated"');
  
  // relation-helper
  test.equal(typeof(relation.getRef), 'function', 'Relation class does not implement the relation-helper');
});