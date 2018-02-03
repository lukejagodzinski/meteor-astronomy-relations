import { Class } from 'meteor/jagi:astronomy';
import _each from 'lodash/each';
import _has from 'lodash/has';
import _isObject from 'lodash/isObject';

function onParseDefinition(parsedDefinition, definition, className) {
  if (_has(definition, 'relations')) {
    if (!_isObject(definition.relations)) {
      throw new Error(
        'The relations definition in the "' + className +
        '" class has to be an object'
      );
    }

    _each(definition.relations, function(relation, relationName) {
      var relation;

      if (!_isObject(relation)) {
        throw new Error(
          'The "' + relationName + '" relation definition in the "' +
          className + '" class has to be an object'
        );
      }

      if (relation.type !== 'one' && relation.type !== 'many') {
        throw new Error(
          'The relation type for the "' + relationName +
          '" relation in the "' + className +
          '" class should be "one" or "many"'
        );
      }

      if(!_isObject(Class.get(relation.class))) {
        throw new Error(
          'The class field in the "' + relationName + '" relation definition in the "' +
          className + '" class has to be an Astronomy-Class'
        );
      }
      
      parsedDefinition.relations[relationName] = relation;
    });
  }
};

export default onParseDefinition;