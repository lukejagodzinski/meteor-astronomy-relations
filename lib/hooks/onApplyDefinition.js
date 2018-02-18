import _size from "lodash/size";
import _extend from "lodash/extend";
import _each from "lodash/each";

const onApplyDefinition = (Class, parsedDefinition, className) => {
  const schema = Class.schema;

  if (_size(parsedDefinition) > 0) {
    // Add relations to the schema.
    _extend(schema.relations, parsedDefinition.relations);

    // Create helpers.
    const methods = {};
    _each(parsedDefinition.relations, (relationDefinition, relationName) => {
      methods[relationName] = function() {
        return this.getRelated(relationName);
      };
    });
    Class.extend({ helpers: methods }, ["helpers"]);
  }
};

export default onApplyDefinition;
