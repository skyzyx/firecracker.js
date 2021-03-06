// Taken from https://github.com/brunoscopelliti/delegate under the MIT license.
// Reversed the `(selector, fn)` parameters.

// **Example:**
//
// ```javascript
// const listen = Delegate;
//
// // Add event
// const evt = $(document.body).on('click',
//   listen('.example', evt => {
//     $(evt.target).toggle('enabled')
//   })
// );
//
// // Remove event
// evt.remove();
// ```
/**
 * Assure that the provided function, `fn`, is executed only when its wrapping
 * function is called on a target that matches the `selector`.
 *
 * @name delegate
 * @param {string} selector
 * @param {function} fn
 *
 * @returns {function}
 */
const Delegate = (selector, fn) => function handler(event) {
  const matchingEl = matches(event.target, selector, this); // eslint-disable-line no-invalid-this

  if (matchingEl !== null) {
    fn.call(matchingEl, event);
  }
};

// Default export for the package.
export default Delegate;

// Private method. Not exposed to the public.
/**
 * @name matches
 * @private
 */
const matches = (target, selector, boundElement) => {
  if (target === boundElement) {
    return null;
  }

  if (target.matches(selector)) {
    return target;
  }

  if (target.parentNode && target.parentNode !== document) {
    return matches(target.parentNode, selector, boundElement);
  }

  return null;
};
