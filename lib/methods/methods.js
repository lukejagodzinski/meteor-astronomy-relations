import { Class } from "meteor/jagi:astronomy";
import _has from "lodash/has";

const prototypeMethods = {
  getRelated(relationName) {
    const doc = this;
    const Class = doc.constructor;

    // Look for the relation definition.
    const relation = Class.getRelation(relationName);
    if (!relation) {
      return;
    }

    // Get the foreign collection defined in the relation.
    const ForeignClass = relation.class;

    // Prepare selector to select only those documents that match the relation.
    const selector = {};

    // Query the related Astro object(s).
    let related;
    if (relation.type === "one") {
      const localValue = this.get(relation.local) || null;
      selector[relation.foreign] = localValue;
      related = ForeignClass.findOne(selector);
    } else if (relation.type === "many") {
      const localValue = this.get(relation.local) || [];
      selector[relation.foreign] = { $in: localValue };
      related = ForeignClass.find(selector);
    }

    return related;
  }
};

const classMethods = {
  hasRelation(relationName) {
    return _has(this.schema.relations, relationName);
  },
  getRelation(relationName) {
    return this.schema.relations[relationName];
  },
  getRelations() {
    return this.schema.relations;
  }
};

export { prototypeMethods, classMethods };
