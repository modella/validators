
/**
 * Improved instanceof
 */
module.exports = function instance (obj, type) {
  switch (typeof obj) {
    case 'undefined': return false;
    case 'null': return false;
    case 'object': return obj instanceof type;
  }
  // compare constructor of primitive
  return obj.constructor == type;
}
