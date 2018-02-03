import {prototypeMethods, classMethods} from '../methods/methods.js';
import _extend from 'lodash/extend';

function onInitClass(Class, className) {
  // Add methods to the class prototype if it has any relations.
  _extend(Class.prototype, prototypeMethods);

  // Add class methods to the class if it has any relations.
  _extend(Class, classMethods);
};

export default onInitClass;