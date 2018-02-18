import { Module } from "meteor/jagi:astronomy";
import onInitSchema from "./hooks/onInitSchema.js";
import onInitDefinition from "./hooks/onInitDefinition.js";
import onParseDefinition from "./hooks/onParseDefinition.js";
import onMergeDefinitions from "./hooks/onMergeDefinitions.js";
import onApplyDefinition from "./hooks/onApplyDefinition.js";
import onInitClass from "./hooks/onInitClass.js";

Module.create({
  name: "relations",
  onInitSchema,
  onInitDefinition,
  onParseDefinition,
  onMergeDefinitions,
  onApplyDefinition,
  onInitClass
});
