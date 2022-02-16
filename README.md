# firecracker.js

A small DOM manipulation and eventing library that packs a big punch!

* Angular and React are built by giant FAANG/MANAA companies that have needs that most of us don't.
* Vue.js is _React-lite_, but is still pretty damn large, and there are arguably too many abstractions.
* jQuery tries to do too much magic and its size suffers as a result.

If you're looking for something _tiny_, which handles the DOM and event fundamentals, and keeps things “close to the metal”, `firecracker.js` may be the right tool for you.

## Features

### Goals

* Provide “close to the metal” syntactic sugar around DOM manipulation, events, and templating.

* If it’s broadly supported in modern browsers, leverage the built-in functionality. Avoid polyfills.

* Keep the final bundle as small as possible when minified and compressed. Aiming to keep the [Brotli](https://www.google.com/search?q=gzip+vs+brotli)-compressed version under 2 kb.

* No external dependencies. The fact that [left-pad](https://www.davidhaney.io/npm-left-pad-have-we-forgotten-how-to-program/) was ever a problem shows just how much of a dumpster-fire the npm ecosystem is. I'm choosing to not be part of the problem.

### What firecracker.js has

* **Firecracker DOMBuilder** is a Virtual DOM construction implementation which dramatically improves on the core DOM primitives. Less syntax and more chaining makes it much easier to dynamically construct Virtual DOM in JavaScript before attaching it to the page.

* **Firecracker DOMQuery** contains DOM traversal helpers (e.g., the “good parts” of jQuery), and implement them using DOM levels 3 and 4 so that they are fast, small, and target modern browsers. Provides a lightweight wrapper around DOM objects, while still exposing access to the underlying `Element` and `NodeList` data types.

* **Firecracker Events** is an implementation of the _event delegation_ pattern, using core DOM events and built for modern browsers.

* **Firecracker Templates** is a lightweight implementation of React/Vue.js-style _components_ built atop the core DOMBuilder, DOMQuery, and Event primitives.

### What firecracker.js doesn’t have

* No Ajax. Take a look at [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) instead.

* No JSX, but JSX is essentially a thin wrapper around [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) anyway.

* No utility functions. Take a look at [Underscore.js](https://underscorejs.org) or [Lodash](https://lodash.com) if that’s something you need.

* No support for [Internet Explorer](https://docs.microsoft.com/en-us/lifecycle/faq/internet-explorer-microsoft-edge) or [EdgeHTML](https://techcommunity.microsoft.com/t5/microsoft-365-blog/new-microsoft-edge-to-replace-microsoft-edge-legacy-with-april-s/ba-p/2114224) as both are end-of-life. If you need support for legacy browser engines, take a look at [Babel](https://babeljs.io).

## Examples

### DOMBuilder

The HTML to generate.

```html
<div id="test" class="sample">
    <p>This is a <a href="">sample of the code</a> that you may like.</p>
    <p>And another <a href="#"><strong>complex-ish</strong></a> one.</p>
    <ul class="sample">
        <li><a href="http://google.com">One</a></li>
        <li><em>Two</em></li>
        <li><strong>Three</strong></li>
    </ul>
</div>
```

This is an example of how to generate it using DOMBuilder. We’ll alias `DOMBuilder` to the `_` variable to make invocation shorter, and also note that the `._()` method is for adding child nodes. (It’s a lot of underscores, I know, but it makes typing a lot faster.) You can blend HTML as well.

```javascript
const _ = DOMBuilder;
const $ = DOMQuery;

// Do the generation and write to the live DOM
$('body').append(
  _('div#test.sample')._([
    _('p').h('This is a <a href="">sample of the code</a> that you may like.'),
    _('p').h('And another <a href="#"><strong>complex-ish</strong></a> one.'),
    _('ul.sample')._([
      _('li')._(_('a[href=http://google.com]').h('One')),
      _('li')._(_('em').h('Two')),
      _('li')._(_('strong').h('Three'))
    ])
  ])
);
```

You can also do repetitive things more programmatically.

```javascript
const _ = DOMBuilder;
const $ = DOMQuery;

// Generate an HTML list from some data
const data = ['One', 'Two', 'Three', 'Four', 'Five'];

$('body').append(
  _('ul')._(
    data.map(value => _('li').h(value))
  )
);
```

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
```

### DOMQuery

A contrived example.

```javascript
const _ = DOMBuilder;
const $ = DOMQuery;

$('nav')[0]
  .descendants('a[href="#"]')[0]
  .ancestor('nav')
  .children('div')[0]
  .siblings()[0]
  .prev()
  .next()
  .get();
```

## Filesize

| File                | Description           | Size in bytes |
|---------------------|-----------------------|---------------|
| `firecracker.js`    | Stripped and minified | 4496       |
| `firecracker.js.gz` | gzip-compressed       | 1713      |
| `firecracker.js.br` | brotli-compressed     | 1508    |

## Inspiration

DOMBuilder inspired [DOMBrew](https://github.com/glebm/DOMBrew/), which then inspired improvements to DOMBuilder.
