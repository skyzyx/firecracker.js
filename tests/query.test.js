/**
 * @jest-environment jsdom
 */

const fs = require('fs'),
  html = fs.readFileSync(`${ __dirname }/index.html`).toString(),
  DOMQuery = require('../src/query.js'),
  $ = DOMQuery;

document.body.innerHTML = html;

describe('dom query', () => {
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

  it('selects multiple elements', () => {
    expect.hasAssertions();

    const
      actual = $('img.h-10.w-10.rounded-full, a[href="#"]').length,
      expected = 17;

    expect(actual).toStrictEqual(expected);
  });

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

describe('not yet implemented', () => {
  it.todo('selects an element, then appends DOM nodes to the end');
  it.todo('selects an element, then appends DOM nodes to position index');
  it.todo('selects an element, then wraps with another node');
  it.todo('selects an element, then wraps with another node, and re-injects in-place');
});
