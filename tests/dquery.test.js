/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'; // eslint-disable-line no-unused-vars
import DQuery from '../src/dquery.js'; // eslint-disable-line sort-imports
import VDOM from '../src/vdom.js'; // eslint-disable-line sort-imports

const fs = require('fs'),
  html = fs.readFileSync(`${ __dirname }/index.html`).toString(),
  _ = VDOM,
  $ = DQuery;

document.body.innerHTML = html;

describe('direct query', () => {
  it('selects elements #1', () => {
    expect.hasAssertions();

    const
      actual = $('nav').length,
      expected = 1;

    expect(actual).toStrictEqual(expected);
  });

  it('selects elements #2', () => {
    expect.hasAssertions();

    const
      actual = $('a[href="#"]').length,
      expected = 16;

    expect(actual).toStrictEqual(expected);
  });

  it('selects elements #3', () => {
    expect.hasAssertions();

    const
      actual = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]').length,
      expected = 5;

    expect(actual).toStrictEqual(expected);
  });

  it('selects elements where DOM element is given', () => {
    expect.hasAssertions();

    const
      body = document.createElement('body'),
      actual = $(body).get(),
      expected = body;

    expect(actual).toStrictEqual(expected);
  });

  it('selects multiple elements', () => {
    expect.hasAssertions();

    const
      actual = $('img.h-10.w-10.rounded-full, a[href="#"]').length,
      expected = 17;

    expect(actual).toStrictEqual(expected);
  });
});

describe('children and descendants', () => {
  it('selects children (selector)', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].children('#mobile-menu').length,
      expected = 1;

    expect(actual).toStrictEqual(expected);
  });

  it('selects children (no selector)', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].children().length,
      expected = 2;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants (selector)', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].descendants('svg').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants (no selector)', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].descendants().length,
      expected = 2;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants (selector), then direct parents', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].
        descendants('svg').
        filter(e => e.parent().
          get().
          tagName.toLowerCase() === 'button').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });
});

describe('parents and ancestors', () => {
  it('returns null when direct parents do not exist', () => {
    expect.hasAssertions();

    const
      actual = (() => {
        const body = document.createElement('body'),
          div = document.createElement('div');

        body.appendChild(div);

        return $('div', body)[0].parent().parent();
      })(),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants, then ancestors (selector)', () => {
    expect.hasAssertions();

    const
      start = $('nav'),
      actual = start[0].
        descendants('svg').
        filter(e => e.ancestor('button').
          get().
          tagName.toLowerCase() === 'button').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants, then ancestors (no selector)', () => {
    expect.hasAssertions();

    const
      start = $('nav'),
      actual = start[0].
        descendants('svg').
        filter(e => e.ancestor().
          get().
          tagName.toLowerCase() === 'button').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });
});

describe('siblings', () => {
  it('returns no results for siblings when a parent does not exist', () => {
    expect.hasAssertions();

    const
      actual = (() => {
        const body = document.createElement('body'),
          div = document.createElement('div');

        body.appendChild(div);

        return $('div', body)[0].parent().siblings();
      })(),
      expected = [];

    expect(actual).toStrictEqual(expected);
  });

  it('selects siblings (no selector)', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].siblings().length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });

  it('selects siblings (selector)', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].siblings('.two').length,
      expected = 1;

    expect(actual).toStrictEqual(expected);
  });

  it('selects next sibling (no selector)', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].next(),
      expected = start[1];

    expect(actual).toStrictEqual(expected);
  });

  it('selects next sibling (selector) exists', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].next('.three'),
      expected = start[2];

    expect(actual).toStrictEqual(expected);
  });

  it('selects next sibling (selector) not exists', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].next('.one'),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects NO next sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].next(),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects next-next sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].next().next(),
      expected = start[2];

    expect(actual).toStrictEqual(expected);
  });

  it('selects previous sibling (no selector)', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].prev(),
      expected = start[3];

    expect(actual).toStrictEqual(expected);
  });

  it('selects previous sibling (selector) exists', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].prev('.three'),
      expected = start[2];

    expect(actual).toStrictEqual(expected);
  });

  it('selects previous sibling (selector) not exists', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].prev('.five'),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects NO previous sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].prev(),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects previous-previous sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].prev().prev(),
      expected = start[2];

    expect(actual).toStrictEqual(expected);
  });
});

describe('append and prepend', () => {
  it('selects an element, then appends DOM nodes as children to the end (DOM Element)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = document.createElement('p'),
      div = document.createElement('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.append(p);
        start.append(div);

        return start.children()[1].get();
      })(start, p, div),
      expected = div;

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then appends DOM nodes as children to the end (VDOM)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = _('p'),
      div = _('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.append(p);
        start.append(div);

        return start.children()[1].get();
      })(start, p, div),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then prepends DOM nodes as children at the beginning (DOM Element)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = document.createElement('p'),
      div = document.createElement('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.prepend(p);
        start.prepend(div);

        return start.children()[0].get();
      })(start, p, div),
      expected = div;

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then prepends DOM nodes as children at the beginning (VDOM)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = _('p'),
      div = _('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.prepend(p);
        start.prepend(div);

        return start.children()[0].get();
      })(start, p, div),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then inserts adjacent DOM nodes before (DOM Element)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = document.createElement('p'),
      div = document.createElement('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.prepend(p).before(div);

        return start.children()[0].get();
      })(start, p, div),
      expected = div;

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then inserts adjacent DOM nodes before (VDOM)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = _('p'),
      div = _('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.prepend(p).before(div);

        return start.children()[0].get();
      })(start, p, div),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then inserts adjacent DOM nodes after (DOM Element)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = document.createElement('p'),
      div = document.createElement('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.prepend(p).after(div);

        return start.children()[1].get();
      })(start, p, div),
      expected = div;

    expect(actual).toStrictEqual(expected);
  });

  it('selects an element, then inserts adjacent DOM nodes after (VDOM)', () => {
    expect.hasAssertions();

    const
      start = $(document.createElement('body')),
      p = _('p'),
      div = _('div'),
      actual = ((start, p, div) => { // eslint-disable-line no-shadow
        start.prepend(p).after(div);

        return start.children()[1].get();
      })(start, p, div),
      expected = div.dom();

    expect(actual).toStrictEqual(expected);
  });
});

describe('not yet implemented', () => {
  it.todo('selects an element, then wraps with another node');
  it.todo('selects an element, then clones it');
});
