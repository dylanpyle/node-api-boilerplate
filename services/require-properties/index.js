'use strict';

const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * Ensure that an object has a set of properties - otherwise, throw an error.
 * @example
 *   requireProperties({ foo: 'bar' }, 'foo', 'baz', 'qux')
 *   - will throw 'Missing required properties: baz, qux'
 */
function requireProperties(obj, ...props) {
  const missingProps = [];

  props.forEach((prop) => {
    if (!hasProp(obj, prop)) {
      missingProps.push(prop);
    }
  });

  if (missingProps.length > 0) {
    throw new Error(`Missing required properties: ${missingProps.join(', ')}`);
  }
}

module.exports = requireProperties;
