class DQueryNode {
  /**
   * DQueryNode wraps DOM Element objects with enhanced functionality.
   *
   * @param {Element} node A DOM Element object, which represents an HTML tag.
   */
  constructor(node) {
    this.node = node;
  }

  /**
   * Gets the underlying native DOM Element object.
   *
   * @returns Element
   */
  get() {
    return this.node;
  }

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

  /**
   * Gets all immediate children which match a selector.
   *
   * @param {string} selector (Optional) CSS selector to match, if any.
   * @returns []DQueryNode
   */
  children(selector) {
    selector = selector || '';

    return Array.from(this.node.childNodes).
      filter(e => e.nodeType === Node.ELEMENT_NODE).
      filter(e => (selector !== '' && e.matches(selector)) || (selector === '')).
      map(e => new DQueryNode(e));
  }

  /**
   * Gets all sibling elements of the immediate parent which match a selector.
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
          && (
            (selector !== '' && sibling.matches(selector))
            || (selector === '')
          )
        ) {
          siblings.push(new DQueryNode(sibling));
        }
      }

      sibling = sibling.nextSibling;
    }

    return siblings;
  }

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
      if (
        next.nodeType === Node.ELEMENT_NODE
        && (
          (selector !== '' && next.matches(selector))
          || (selector === '')
        )
      ) {
        return new DQueryNode(next);
      }

      next = next.nextSibling;
    }

    return null;
  }

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
      if (
        prev.nodeType === Node.ELEMENT_NODE
        && (
          (selector !== '' && prev.matches(selector))
          || (selector === '')
        )
      ) {
        return new DQueryNode(prev);
      }

      prev = prev.previousSibling;
    }

    return null;
  }

  /**
   * Prepends the provided element to the selected node, then returns a pointer
   * to the prepended node in the DOM.
   *
   * @param {Element} element (Required) The DOM element to prepend.
   * @returns DQueryNode
   */
  prepend(element) {
    if (typeof element.dom !== 'undefined') {
      this.node.insertAdjacentElement('afterbegin', element.dom());
    } else {
      this.node.insertAdjacentElement('afterbegin', element);
    }

    return new DQueryNode(this.node.childNodes[0]);
  }

  /**
   * Appends the provided element to the selected node, then returns a pointer
   * to the appended node in the DOM.
   *
   * @param {Element} element (Required) The DOM element to append.
   * @returns DQueryNode
   */
  append(element) {
    if (typeof element.dom !== 'undefined') {
      this.node.insertAdjacentElement('beforeend', element.dom());
    } else {
      this.node.insertAdjacentElement('beforeend', element);
    }

    return new DQueryNode(
      this.node.childNodes[this.node.childNodes.length - 1],
    );
  }

  /**
   * Inserts the provided element before the selected node, then returns a
   * pointer to the added node in the DOM.
   *
   * @param {Element} element (Required) The DOM element to insert before.
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

  /**
   * Inserts the provided element after the selected node, then returns a
   * pointer to the added node in the DOM.
   *
   * @param {Element} element (Required) The DOM element to insert after.
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

  /**
   * A wrapper for addEventListener with `once: false`.
   *
   * @param {string} type A valid event type, like `click`. See
   *     <https://developer.mozilla.org/en-US/docs/Web/Events> or more information.
   * @param {string|function|Delegate} fn A callback function to execute, or a string
   *     containing the name of the function.
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

module.exports = DQuery = function(selector, elem) { // eslint-disable-line no-undef
  if (selector instanceof Element) {
    return new DQueryNode(selector);
  }

  const collection = [];

  elem = elem || document;
  if (elem === document) {
    document.querySelectorAll(selector).forEach((ee) => {
      collection.push(new DQueryNode(ee));
    });

    return collection;
  }

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
};