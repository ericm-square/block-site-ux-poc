'use strict';

const isObject = require('./isObject-7dcf0083.js');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObject.isObjectLike(value) && isObject.baseGetTag(value) == symbolTag);
}

exports.isSymbol = isSymbol;

//# sourceMappingURL=isSymbol-fbd13c73.js.map