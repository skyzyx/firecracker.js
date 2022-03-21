// VDOM is an updated ES6+ version of a Virtual DOM implementation I built in
// 2008 before Virtual DOM even had a name yet.
//
// The term “Virtual DOM” refers to real DOM nodes that exist in memory, but are
// not attached to the _live_ tree. This means that they can be modified and
// manipulated in-memory without triggering repaints and reflows in the browser
// engine, making modifications dramatically faster.
//
// By leveraging `DocumentFragment` objects under the hood, we can collect one
// or more sibling elements together which do not have a shared parent node
// until they are injected into the live DOM. This is fundamentally the same way
// that `React.createElement()` works, and the syntax is very similar.
//
// **Examples:**
//
// From the <https://reactjs.org> homepage, this example generates a new DOM
// element and appends it to the live DOM.
//
// ```javascript
// class HelloMessage extends React.Component {
//   render() {
//     return (
//       <div>
//         Hello {this.props.name}
//       </div>
//     );
//     // or...
//     // return React.createElement(
//     //   "div",
//     //   null,
//     //   "Hello ",
//     //   this.props.name
//     // );
//   }
// }
//
// ReactDOM.render(
//   React.createElement(
//     HelloMessage, { name: "Taylor" }
//   ),
//   document.getElementById('hello-example')
// );
// ```
//
// Here's a (roughly) equivalent example using VDOM, except that there are no
// _magical_ `props` because there are no `components`. Just standard functions
// and variables.
//
// ```javascript
// const _ = VDOM,
//       $ = DQuery;
//
// function HelloMessage(props) {
//   return `
//     <div>
//       Hello ${props.name}
//     </div>
//   `;
//   // or...
//   // return _('div').h(`Hello ${props.name}`);
// }
//
// $('#hello-example')[0].append(
//   HelloMessage({ name: "Taylor" })
// );
// ```
//
// VDOM sits much “closer to the metal”, which makes it (a) faster, and (b)
// smaller. While it lacks some of the niceties like JSX, you can still use
// `innerHTML` which gets you _most_ of the way there at very little cost.
//
// ----

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

      // Loop through the indexed array of children. If the node is a `VDOM` object, convert it to
      // DOM and append it. Otherwise, assume it's a real DOM node.
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
  },

  // Pre-instantiate the class on each call so that you never need to use `new`.
  VDOM = (elem, attr) => new X(elem, attr); // eslint-disable-line no-undef

VDOM.DOM = (...nodes) => { // eslint-disable-line no-undef
  // Create a document fragment. Grab and loop through the in-memory DOM nodes,
  // and _move_ them to the `DocumentFragment`.
  const f = document.createDocumentFragment(),
    n = new X('div')._(nodes).
      dom().childNodes;

  while (n.length) {
    f.appendChild(n[0]);
  }

  return f;
};

VDOM.t = str => document.createTextNode(str); // eslint-disable-line no-undef

VDOM.h = (str) => { // eslint-disable-line no-undef
  const f = document.createDocumentFragment(),
    n = new X('div').h(str).
      dom().childNodes;

  while (n.length) {
    f.appendChild(n[0]);
  }

  return f;
};

// Default export for the package.
export default VDOM;
