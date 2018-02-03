import {prototypeMethods, classMethods} from '../methods/methods.js';
function onInitClass(Class, className) {
  // Add methods to the class prototype if it has any relations.
  _extend(Class.prototype, prototypeMethods);

  // Add class methods to the class if it has any relations.
  _extend(Class, classMethods);
};

export default onInitClass;