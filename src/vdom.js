const X = function(elem, attr) {
  const self = this,
    RE_ID_OR_CLASS = /[\.#]/u, // eslint-disable-line no-useless-escape
    RE_CSS_ATTRS = /\[([^\]]+)\]/gu,
    ARR_NEXT = 1;

  let key, k, match;

  attr = attr || {};

  // Parse the CSS-style notation.
  function notation() {
    const att = {
        class: [],
        id: '',
      },
      kvPair = [];

    if (!RE_ID_OR_CLASS.test(elem) && !RE_CSS_ATTRS.test(elem)) {
      return {};
    }

    // Collect all of the `[k=v]` blocks.
    while ((match = RE_CSS_ATTRS.exec(elem)) !== null) {
      kvPair.push(match[1].split('='));
    }

    elem = elem.replace(RE_CSS_ATTRS, '');
    const pieces = elem.split(RE_ID_OR_CLASS),
      elemType = pieces.shift();

    kvPair.forEach((val, idx, arr) => {
      att[arr[idx][0]] = arr[idx][1];
    });

    // Support CSS/jQuery-style notation for generating elements with IDs and classnames.
    let pos = elemType.length;
    const classes = att['class'];

    pieces.forEach((val, idx, arr) => {
      if (elem[pos] === '#') {
        att.id = val;
      } else {
        classes.push(val);
      }

      pos += arr[idx].length + ARR_NEXT;
    });

    att['class'] = classes;
    if (!att['class'].length) {
      delete att['class'];
    }

    if (att['id'] === '') {
      delete att['id'];
    }

    return att;
  }

  // Merge options into a conglomo-hash!
  attr = Object.assign(attr, notation());

  // Construct the element, loop through the list of attributes and add them to the node.
  if (RE_ID_OR_CLASS.test(elem)) {
    self.e = document.createElement(elem.split(RE_ID_OR_CLASS).shift());
  } else {
    self.e = document.createElement(elem);
  }

  if (attr) {
    for (key in attr) {
      if (Object.prototype.hasOwnProperty.call(attr, key)) {
        if (
          typeof attr[key] === 'object'
          && typeof attr[key].length === 'number'
          && typeof attr[key].splice === 'function'
        ) {
          attr[key] = attr[key].join(' ');
        }

        if (key.toString() === 'class') {
          self.e.className = attr[key];

          // Support `data: {}` for data attributes
        } else if (key.toString() === 'data') {
          for (k in attr[key]) {
            if (Object.prototype.hasOwnProperty.call(attr[key], k)) {
              self.e.setAttribute(`data-${ k }`, attr[key][k]);
            }
          }
        } else {
          self.e.setAttribute(key, attr[key]);
        }
      }
    }
  }

  // Handle child nodes.
  self._ = (obj) => {
    // If the object isn't an array, convert it to an array to maintain a single codepath below.
    if (!Array.isArray(obj)) {
      obj = [obj];
    }

    /* Loop through the indexed array of children. If the node is a `DOMBuilder` object, convert it to
       DOM and append it. Otherwise, assume it's a real DOM node. */
    for (let i = 0, max = obj.length; i < max; i ++) {
      if (typeof obj[i] === 'undefined') {
        break;
      }

      if (typeof obj[i].dom !== 'undefined') {
        self.e.appendChild(obj[i].dom());
      } else {
        self.e.appendChild(obj[i]);
      }
    }

    return self;
  };

  // Set the HTML
  self.h = (str, replace) => {
    // Determine the default value for `replace`.
    replace = replace || false;

    // Set the value with innerHTML.
    if (replace) {
      self.e.innerHTML = str;
    } else {
      self.e.innerHTML += str;
    }

    return self;
  };

  // Set the text
  self.t = (str) => {
    // No parameters? Read the value instead. Alias for __t().
    if (typeof str === 'undefined') {
      return self.__t();
    }

    // Set the value
    const text = document.createTextNode(str);

    self.e.appendChild(text);

    return self;
  };

  // Get DOMElement
  self.dom = () => self.e;

  // Get as HTML
  self.toString = () => {
    const t = document.createElement('div');

    t.appendChild(self.e);

    return t.innerHTML;
  };

  // Get as text
  self.__t = () => {
    const t = document.createElement('div');

    t.appendChild(self.e);

    return t.textContent || t.innerText;
  };

  return self;
};

// Pre-instantiate the class on each call so that you never need to use `new`.
module.exports = DOMBuilder = (elem, attr) => new X(elem, attr); // eslint-disable-line no-undef

DOMBuilder.DOM = (...nodes) => { // eslint-disable-line no-undef
  // Create a document fragment. Grab and loop through the in-memory DOM nodes, and _move_ them to the
  const f = document.createDocumentFragment(),
    n = new X('div')._(nodes).
      dom().childNodes;

  while (n.length) {
    f.appendChild(n[0]);
  }

  return f;
};

DOMBuilder.t = str => document.createTextNode(str); // eslint-disable-line no-undef

DOMBuilder.h = (str) => { // eslint-disable-line no-undef
  const f = document.createDocumentFragment(),
    n = new X('div').h(str).
      dom().childNodes;

  while (n.length) {
    f.appendChild(n[0]);
  }

  return f;
};
