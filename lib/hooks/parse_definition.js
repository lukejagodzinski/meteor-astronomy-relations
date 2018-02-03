import { Class } from 'meteor/jagi:astronomy';

function onParseDefinition(parsedDefinition, definition, className) {
  if (_.has(definition, 'relations')) {
    if (!_.isObject(definition.relations)) {
      throw new Error(
        'The relations definition in the "' + className +
        '" class has to be an object'
      );
    }

    _.each(definition.relations, function(relation, relationName) {
      var relation;

      if (!_.isObject(relation)) {
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

      if(!_.isObject(Class.get(relation.class))) {
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