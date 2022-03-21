/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'; // eslint-disable-line no-unused-vars
import DQuery from '../src/dquery.js'; // eslint-disable-line sort-imports
import VDOM from '../src/vdom.js'; // eslint-disable-line sort-imports

const _ = VDOM,
  $ = DQuery;

describe('simple templating', () => {
  it('renders a basic, stateless component (VDOM)', () => {
    expect.hasAssertions();

    function helloMessage(props) {
      return _('div').h(`Hello ${ props.name }`);
    }

    const
      start = $(document.createElement('body')),
      div = _('div').h('Hello Taylor'),
      actual = ((start) => { // eslint-disable-line no-shadow
        start.append(
          helloMessage({name: 'Taylor'}),
        );

        return start.children()[0].get();
      })(start),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('renders a basic, stateless component (DOMString)', () => {
    expect.hasAssertions();

    function helloMessage(props) {
      return `<div>Hello ${ props.name }</div>`;
    }

    const
      start = $(document.createElement('body')),
      div = _('div').h('Hello Taylor'),
      actual = ((start) => { // eslint-disable-line no-shadow
        start.append(
          helloMessage({name: 'Taylor'}),
        );

        return start.children()[0].get();
      })(start),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('renders content into parent element (innerHTML; VDOM/DOMString)', () => {
    expect.hasAssertions();

    function helloMessage(props) {
      return _('div').h(`Hello ${ props.name }`);
    }

    const
      start = document.createElement('body'),
      div = _('div').h('Hello Taylor'),
      actual = ((start) => { // eslint-disable-line no-shadow
        start.innerHTML = helloMessage({name: 'Taylor'}).toString();

        return $(start).children()[0].get();
      })(start),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('renders content into parent element (render; VDOM)', () => {
    expect.hasAssertions();

    function helloMessage(props) {
      return _('div').h(`Hello ${ props.name }`);
    }

    const
      start = (() => {
        const $body = $(document.createElement('body'));

        $body.get().innerHTML = '<p>Some junk content that will get replaced.</p>';

        return $body;
      })(),
      div = _('div').h('Hello Taylor'),
      actual = ((start) => { // eslint-disable-line no-shadow
        start.render(
          helloMessage({name: 'Taylor'}),
        );

        return start.children()[0].get();
      })(start),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('renders content into parent element (render; DOMString)', () => {
    expect.hasAssertions();

    function helloMessage(props) {
      return `<div>Hello ${ props.name }</div>`;
    }

    const
      start = (() => {
        const $body = $(document.createElement('body'));

        $body.get().innerHTML = '<p>Some junk content that will get replaced.</p>';

        return $body;
      })(),
      div = _('div').h('Hello Taylor'),
      actual = ((start) => { // eslint-disable-line no-shadow
        start.render(
          helloMessage({name: 'Taylor'}),
        );

        return start.children()[0].get();
      })(start),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('renders content into parent element (render; DOM Element)', () => {
    expect.hasAssertions();

    function helloMessage(props) {
      const $div = document.createElement('div');

      $div.appendChild(
        document.createTextNode(
          `Hello ${ props.name }`,
        ),
      );

      return $div;
    }

    const
      start = (() => {
        const $body = $(document.createElement('body'));

        $body.get().innerHTML = '<p>Some junk content that will get replaced.</p>';

        return $body;
      })(),
      div = _('div').h('Hello Taylor'),
      actual = ((start) => { // eslint-disable-line no-shadow
        start.render(
          helloMessage({name: 'Taylor'}),
        );

        return start.children()[0].get();
      })(start),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });
});
