// ## DQueryNode
//
// `DQueryNode` is a private class. Not exposed to the public.
//
// Individual elements are wrapped in a `DQueryNode` object. This allows us to
// extend the functionality. You won't use this directly, but rather as the
// result of using `DQuery` to discover results.
/**
 * Individual elements are wrapped in a `DQueryNode` object. This allows us to
 * extend the functionality. You won't use this directly, but rather as the
 * result of using DQuery to discover results.
 *
 * @param {Element} node (Required) A DOM `Element` object. See
 *     <https://developer.mozilla.org/en-US/docs/Web/API/Element> for more
 *     information.
 * @private
 */
class DQueryNode {
  /**
   * DQueryNode wraps DOM Element objects with enhanced functionality.
   *
   * @param {Element} node A DOM Element object, which represents an HTML tag.
   */
  constructor(node) {
    this.node = node;
  }

  // ----
  // ### Querying/Traversing the DOM tree

  // **Example:**
  //
  // ```javascript
  // $('query')[0].get();
  // $(document.body).get();
  // ```
  /**
   * Gets the underlying native DOM Element object.
   *
   * @returns Element
   */
  get() {
    return this.node;
  }

  // **Example:**
  //
  // ```javascript
  // $('query').ancestor('.example').get();
  // $('query').ancestor().get(); // ← No selector == parent.
  // ```
  /**
   * Gets the nearest ancestor which matches a selector. If no selector is
   * given, returns parent.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns DQueryNode
   */
  ancestor(selector) {
    selector = selector || '';

    if (selector === '') {
      return this.parent();
    }

    return new DQueryNode(this.node.closest(selector));
  }

  // **Example:**
  //
  // ```javascript
  // $('query').parent().get();
  // ```
  /**
   * Gets the immediate parent element.
   *
   * @returns DQueryNode
   */
  parent() {
    if (!this.node.parentNode) {
      return null;
    }

    return new DQueryNode(this.node.parentNode);
  }

  // **Example:**
  //
  // ```javascript
  // $('query').descendants('.example')[0].get();
  // $('query').descendants(); // ← No selector == children.
  // ```
  /**
   * Gets all descendants which match a selector. If no selector is given,
   * returns children.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns DQuery
   */
  descendants(selector) {
    selector = selector || '';

    if (selector === '') {
      return this.children();
    }

    return new DQuery(selector, this.node); // eslint-disable-line no-undef
  }

  // **Example:**
  //
  // ```javascript
  // $('query').children(); // ← All direct children.
  // $('query').children('.example');
  // ```
  /**
   * Gets all immediate child HTML elements which match a selector. Excludes
   * whitespace nodes, comment nodes, etc.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns []DQueryNode
   */
  children(selector) {
    selector = selector || '';

    return Array.from(this.node.childNodes).
      filter(e => e.nodeType === Node.ELEMENT_NODE).
      filter(e => (selector !== '' && e.matches(selector)) || selector === '').
      map(e => new DQueryNode(e));
  }

  // **Example:**
  //
  // ```javascript
  // $('query').siblings().forEach($e => {
  //   return $e.remove('enabled')
  // })
  // ```
  /**
   * Gets all sibling HTML elements of the immediate parent which match a
   * selector. Excludes self, whitespace nodes, comment nodes, etc.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns []DQueryNode
   */
  siblings(selector) {
    selector = selector || '';

    if (!this.node.parentNode) {
      return [];
    }

    let sibling = this.node.parentNode.firstChild;
    const siblings = [];

    while (sibling) {
      if (sibling !== this.node) {
        if (
          sibling.nodeType === Node.ELEMENT_NODE
          && ((selector !== '' && sibling.matches(selector)) || selector === '')
        ) {
          siblings.push(new DQueryNode(sibling));
        }
      }

      sibling = sibling.nextSibling;
    }

    return siblings;
  }

  // **Example:**
  //
  // ```javascript
  // const start = $('query')[0];
  // while (start.next() != null) {
  //   console.debug(start.next());
  //   start = start.next();
  // }
  // ```
  /**
   * Gets the immediately-next sibling which matches a selector.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns DQueryNode
   */
  next(selector) {
    selector = selector || '';
    let next = this.node.nextSibling;

    while (next) {
      if (next.nodeType === Node.ELEMENT_NODE && ((selector !== '' && next.matches(selector)) || selector === '')) {
        return new DQueryNode(next);
      }

      next = next.nextSibling;
    }

    return null;
  }

  // **Example:**
  //
  // ```javascript
  // const start = $('query')[0];
  // while (start.prev() != null) {
  //   console.debug(start.prev());
  //   start = start.prev();
  // }
  // ```
  /**
   * Gets the immediately-previous sibling which matches a selector.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns DQueryNode
   */
  prev(selector) {
    selector = selector || '';
    let prev = this.node.previousSibling;

    while (prev) {
      if (prev.nodeType === Node.ELEMENT_NODE && ((selector !== '' && prev.matches(selector)) || selector === '')) {
        return new DQueryNode(prev);
      }

      prev = prev.previousSibling;
    }

    return null;
  }

  // ----
  // ### Injecting new DOM nodes

  // **Example:**
  //
  // ```javascript
  // $(document.body).prepend(
  //   _('p#abc').h('This is my paragraph!')
  // ).get();
  // //=> HTMLParagraphElement
  // ```
  /**
   * Prepends the provided element to the selected node, then returns a pointer
   * to the prepended node in the DOM.
   *
   * @param {string|Element} element (Required) The DOM element or HTML string
   *     to prepend.
   * @returns DQueryNode
   */
  prepend(element) {
    if ((typeof element).toLowerCase() === 'string') {
      this.node.insertAdjacentHTML('afterbegin', element);
    } else if (typeof element.dom !== 'undefined') {
      this.node.insertAdjacentElement('afterbegin', element.dom());
    } else {
      this.node.insertAdjacentElement('afterbegin', element);
    }

    return new DQueryNode(this.node.childNodes[0]);
  }

  // **Example:**
  //
  // ```javascript
  // $(document.body).append(
  //   _('p#abc').h('This is my paragraph!')
  // ).get();
  // //=> HTMLParagraphElement
  // ```
  /**
   * Appends the provided element to the selected node, then returns a pointer
   * to the appended node in the DOM.
   *
   * @param {string|Element} element (Required) The DOM element or HTML string
   *     to append.
   * @returns DQueryNode
   */
  append(element) {
    if ((typeof element).toLowerCase() === 'string') {
      this.node.insertAdjacentHTML('beforeend', element);
    } else if (typeof element.dom !== 'undefined') {
      this.node.insertAdjacentElement('beforeend', element.dom());
    } else {
      this.node.insertAdjacentElement('beforeend', element);
    }

    return new DQueryNode(this.node.childNodes[this.node.childNodes.length - 1]);
  }

  // **Example:**
  //
  // ```javascript
  // $(document.body).children()[0].before(
  //   _('p#abc').h('This is my paragraph!')
  // ).get();
  // //=> HTMLParagraphElement
  // ```
  /**
   * Inserts the provided element before the selected node, then returns a
   * pointer to the added node in the DOM.
   *
   * @param {string|Element} element (Required) The DOM element or HTML string
   *     to insert before.
   * @returns DQueryNode
   */
  before(element) {
    if (typeof element.dom !== 'undefined') {
      this.node.before(element.dom());
    } else {
      this.node.before(element);
    }

    return this.prev();
  }

  // **Example:**
  //
  // ```javascript
  // $(document.body).children()[0].after(
  //   _('p#abc').h('This is my paragraph!')
  // ).get();
  // //=> HTMLParagraphElement
  // ```
  /**
   * Inserts the provided element after the selected node, then returns a
   * pointer to the added node in the DOM.
   *
   * @param {string|Element} element (Required) The DOM element or HTML string
   *     to insert after.
   * @returns DQueryNode
   */
  after(element) {
    if (typeof element.dom !== 'undefined') {
      this.node.after(element.dom());
    } else {
      this.node.after(element);
    }

    return this.next();
  }

  // ----
  // ### Managing classnames

  // **Example:**
  //
  // ```javascript
  // $('query')[0].classes();
  // //=> DOMTokenList
  // ```
  /**
   * Returns the list of classnames currently applied to the element.
   *
   * @returns DOMTokenList
   */
  classes() {
    const node = this.node;

    return node.classList;
  }

  // **Example:**
  //
  // ```html
  // <body class="abc def ghi">
  // ```
  //
  // ```javascript
  // $(document.body).has('abc');
  // //=> true
  //
  // $(document.body).has('def');
  // //=> true
  //
  // $(document.body).has('xyz');
  // //=> false
  // ```
  /**
   * Determines whether or not the element has the specified classname applied.
   *
   * @param {string} klass (Required) The classname to check on the element.
   * @returns bool
   */
  has(klass) {
    const node = this.node;

    return node.classList.contains(klass);
  }

  // **Example:**
  //
  // ```html
  // Before: <body class="abc">
  // ```
  //
  // ```javascript
  // $(document.body).add('def');
  // ```
  //
  // ```html
  // After: <body class="abc def">
  // ```
  /**
   * Adds the specified classname to the element.
   *
   * @param {string} klass (Required) The classname to add to the element.
   * @returns bool
   */
  add(klass) {
    const node = this.node;

    return node.classList.add(klass);
  }

  // **Example:**
  //
  // ```html
  // Before: <body class="abc def">
  // ```
  //
  // ```javascript
  // $(document.body).remove('def');
  // ```
  //
  // ```html
  // After: <body class="abc">
  // ```
  /**
   * Removes the specified classname to the element.
   *
   * @param {string} klass (Required) The classname to remove from the element.
   * @returns bool
   */
  remove(klass) {
    const node = this.node;

    return node.classList.remove(klass);
  }

  // **Example:**
  //
  // ```html
  // Before: <body class="abc">
  // ```
  //
  // ```javascript
  // $(document.body).replace('abc', 'xyz');
  // ```
  //
  // ```html
  // After: <body class="xyz">
  // ```
  /**
   * Replaces the specified classname on the element with another classname.
   *
   * @param {string} klass1 (Required) The classname to remove from the element.
   * @param {string} klass2 (Required) The classname to add to the element.
   * @returns bool
   */
  replace(klass1, klass2) {
    const node = this.node;

    return node.classList.replace(klass1, klass2);
  }

  // **Example:**
  //
  // ```html
  // Before: <body class="abc def">
  // ```
  //
  // ```javascript
  // $(document.body).toggle('def');
  // ```
  //
  // ```html
  // After: <body class="abc">
  // ```
  //
  // ```javascript
  // $(document.body).toggle('def');
  // ```
  //
  // ```html
  // After-After: <body class="abc def">
  // ```
  /**
   * Toggles a classname on the element. Returns a boolean value, `true` or
   * `false`, indicating whether or not `klass` is in the list of classnames
   * after the call or not.
   *
   * @param {string} klass (Required) The classname to toggle on the element.
   * @returns bool
   */
  toggle(klass) {
    const node = this.node;

    return node.classList.toggle(klass);
  }

  // ----
  // ### Events

  // **Example:**
  //
  // ```javascript
  // const dlg = Delegate;
  //
  // // Add event
  // const evt = $(document.body).on('click',
  //   dlg('.example', evt => {
  //     $(evt.target).toggle('enabled')
  //   })
  // );
  //
  // // Remove event
  // evt.remove();
  // ```
  /**
   * A wrapper for addEventListener with `once: false`.
   *
   * @param {string} type A valid event type, like `click`. See
   *     <https://developer.mozilla.org/en-US/docs/Web/Events> for more
   *     information.
   * @param {string|function|Delegate} fn A callback function to execute, or a
   *     string containing the name of the function.
   * @returns EventPointer
   */
  on(type, fn) {
    const node = this.node;

    node.addEventListener(type, fn, {once: false});

    return {
      remove: function() {
        node.removeEventListener(type, fn, {once: false});
      },
    };
  }
}

// ----
// ## DQuery
//
// Main interface for DQuery.
/**
 * Main interface for DQuery.
 *
 * Fundamentally, `DQuery` is a wrapper around `querySelectorAll()`, except that
 * the matches are also wrapped with `DQueryNode`. This allows us to extend the
 * functionality.
 *
 * @param {string|Element} selector (Required) Either a (string) CSS selector
 *     (which will always result in an array of `DQueryNode` objects), or a DOM
 *     `Element` object (which will always result in a single `DQueryNode`
 *     element). See <https://developer.mozilla.org/en-US/docs/Web/API/Element>
 *     for more information.
 * @param {Element} elem (Optional) a DOM `Element` object which should be used
 *     as the parent-most element for the query. See
 *     <https://developer.mozilla.org/en-US/docs/Web/API/Element> for more
 *     information. The default value is `document`, which resolves to the
 *     `<html>` element.
 * @returns []DQueryNode|DQueryNode
 */
function DQuery(selector, elem) {
  // If we received a DOM `Element` object, just wrap it and return it.
  if (selector instanceof Element) {
    return new DQueryNode(selector);
  }

  // If the `elem` parameter is not provided, use `document` (`<html>`)as the
  // default root element for the query. Take the results, wrap each one with
  // `DQueryNode`, and return the collection.
  const collection = [];

  elem = elem || document;
  if (elem === document) {
    document.querySelectorAll(selector).forEach((ee) => {
      collection.push(new DQueryNode(ee));
    });

    return collection;
  }

  // If the `elem` parameter _is_ provided (which _may_ be an array of results),
  // iterate over each of the results, then use `:scope` in the selector to
  // filter to only children of `elem` (as opposed to `document`). This will
  // give us the results we expect instead of too many results.
  selector = [':scope', selector].join(' ');

  if (typeof elem[Symbol.iterator] !== 'function') {
    elem = [elem];
  }

  elem.forEach((e) => {
    e.querySelectorAll(selector).forEach((ee) => {
      collection.push(new DQueryNode(ee));
    });
  });

  return collection;
}

// Default export for the package.
export default DQuery;
