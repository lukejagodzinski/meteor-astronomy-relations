import { Module } from 'meteor/jagi:astronomy';
import _each from 'lodash/each';

function onMergeDefinitions(targetDefinition, sourceDefinition, ClassName) {
  _each(sourceDefinition.relations, (relation, relationName) => {
    if( targetDefinition.relations[relationName] ) {
      Module.get("core").utils.warn( 
        'Overwriting of existing relation "' + relationName +
        '" in Class "' + ClassName + '" while merging relations-definitions'
      );
    }
    targetDefinition.relations[relationName] = relation;    // overwrites targetDefinition!
  });
};

export default onMergeDefinitions;